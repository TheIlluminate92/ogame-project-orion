// Historical Project Orion beta13 IAS model, source guide 0.19.6.
// Exact rational arithmetic: each resource component is floored per level.
export function iasCosts(current, target) {
  if (!Number.isInteger(current) || !Number.isInteger(target) || current < 0 || target > 100 || target <= current) {
    throw new RangeError('Use whole levels from 0 to 100, with target above current.');
  }
  const totals = { metal: 0n, crystal: 0n, deuterium: 0n };
  for (let level = current + 1; level <= target; level++) {
    const numerator = 3n ** BigInt(level - 1);
    const denominator = 2n ** BigInt(level - 1);
    for (const [key, base] of Object.entries({metal: 84n, crystal: 42n, deuterium: 14n})) {
      totals[key] += base * numerator / denominator;
    }
  }
  return totals;
}
