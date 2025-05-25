export function calculateTokenPriceUSD(score) {
    const basePrice = 0.01;      // Lower starting price
    const exponent = 1.35;       // Same exponent to preserve curve
    return Number((basePrice * Math.pow(score, exponent)).toFixed(2));
  }