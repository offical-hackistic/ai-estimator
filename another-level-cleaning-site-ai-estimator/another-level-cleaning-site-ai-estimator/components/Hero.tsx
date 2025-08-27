"use client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <section id="home" className="relative h-[90vh] w-full flex flex-col justify-center items-center overflow-hidden">
      <Particles
        id="droplets"
        init={particlesInit}
        options={{
          background: { color: "#0a0f0f" },
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            color: { value: ["#00f5ff", "#00ff95"] },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.6,
              direction: "bottom",
              outModes: { default: "out" },
              gravity: { enable: true, acceleration: 0.6 }
            }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.3 } }
          }
        }}
        className="absolute inset-0 z-0"
      />

      {/* Content with higher z-index to ensure visibility */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{ opacity: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-hackerBlue drop-shadow-glow mb-6"
        >
          Another Level Cleaning Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 2.5, ease: "easeOut" }}
          style={{ opacity: 1 }}
          className="text-lg md:text-xl text-hackerGreen mb-8 leading-relaxed"
        >
          Professional Exterior Cleaning Services in Northeast Arkansas. Get instant AI-powered estimates by uploading photos of your property.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 2.0, ease: "easeOut" }}
          style={{ opacity: 1 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <motion.a
            href="#services"
            className="btn btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            style={{ opacity: 1, transform: "scale(1)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>

          <motion.a
            href="/estimator"
            className="btn btn-outline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
            style={{ opacity: 1, transform: "scale(1)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AI Estimator
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
