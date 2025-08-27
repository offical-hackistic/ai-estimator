export const SERVICE_RATES_PER_SQFT: Record<string, number> = {
  house: 0.15,
  windows: 0.20,
  roof: 0.35,
  driveway: 0.12,
  gutters: 0.18
};

export const MIN_JOB_FEE = 125; // dollars
export const COMPLEXITY_MULTIPLIER = (c:number) => 0.8 + (c-1)*0.15; // 1 -> 0.8x, 3 -> 1.1x, 5 -> 1.4x
