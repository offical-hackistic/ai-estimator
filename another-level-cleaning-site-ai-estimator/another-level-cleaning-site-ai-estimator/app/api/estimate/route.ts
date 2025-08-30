import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { SERVICE_RATES_PER_SQFT, MIN_JOB_FEE, COMPLEXITY_MULTIPLIER } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const service = String(formData.get("service") || "house");
    const images: File[] = formData.getAll("images") as any;

    if (!images || images.length === 0) {
      return NextResponse.json({ error: "No images uploaded" }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY on server" }, { status: 500 });
    }

    // Convert images to base64 data URLs
    const dataUrls: string[] = [];
    for (const f of images) {
      const arrayBuffer = await f.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const mime = f.type || "image/jpeg";
      dataUrls.push(`data:${mime};base64,${base64}`);
    }

    const systemPrompt = `You are an estimator for an exterior cleaning company in Jonesboro, Arkansas.
Analyze residential/exterior property photos and output a conservative, *numeric* estimate of:
- VISIBLE exterior surface area in square feet (house siding/windows/roof or concrete depending on service)
- Complexity score from 1 (very simple) to 5 (very complex). Complexity increases with multiple stories, architectural details, obstructions, steep roof pitch, heavy staining, etc.
Return STRICT JSON like: {"area_sqft": <number>, "complexity": <number>, "notes": "<short reason>"}.
If the scene is not a property exterior, use best judgment from visible context.`;

    const userPrompt = `Service type: ${service}.
From ALL provided images, estimate total *cleanable* area in square feet visible (do not overestimate) and a complexity 1-5.
Keep JSON short. Do not include anything else.`;

    // Call OpenAI Responses API (gpt-4o-mini) with images
    const messages:any[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: [
        { type: "text", text: userPrompt },
        ...dataUrls.map((u)=>({ type: "input_image", image_url: u }))
      ] }
    ];

    const body = {
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2,
      response_format: { type: "json_object" }
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    let area_sqft: number;
    let complexity: number;
    let notes: string;
    let estimation_method: string;

    if (!r.ok) {
      // Fallback to Smart Estimator when AI fails
      console.log("AI estimation failed, using Smart Estimator fallback");
      
      // Smart Estimator logic based on service type and image count
      const baseAreaByService: Record<string, number> = {
        house: 1500,
        windows: 800,
        roof: 1200,
        driveway: 400,
        gutters: 200
      };
      
      area_sqft = baseAreaByService[service] || 1000;
      complexity = 2.5; // Default complexity
      notes = "Smart Estimator used - AI analysis temporarily unavailable. Estimate based on typical property size for this service type.";
      estimation_method = "smart";
    } else {
      const out = await r.json();
      const content = out.choices?.[0]?.message?.content || "{}";
      let parsed: any = {};
      try { parsed = JSON.parse(content); } catch { parsed = {}; }

      area_sqft = Math.max(0, Number(parsed.area_sqft || 0));
      complexity = Math.min(5, Math.max(1, Number(parsed.complexity || 2.5)));
      notes = String(parsed.notes || "AI-computed from uploaded photos.");
      estimation_method = "ai";
    }

    const rate = SERVICE_RATES_PER_SQFT[service] ?? 0.15;
    const complexity_factor = COMPLEXITY_MULTIPLIER(complexity);
    const subtotal = Math.max(MIN_JOB_FEE, area_sqft * rate * complexity_factor);
    const total = Math.round(subtotal * 100) / 100;

    return NextResponse.json({
      service, area_sqft, complexity, rate, complexity_factor,
      total, notes, images_analyzed: dataUrls.length, estimation_method
    });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || "Unexpected error" }, { status: 500 });
  }
}
