export function selectMapTilerKey(
	key1: string | undefined,
	key2: string | undefined,
	spDate: Date,
	randomFn: () => number = Math.random,
): string | undefined {
	if (!key1) return undefined;
	if (!key2) return key1;

	// Month is 0-indexed (0=Jan, 1=Feb, 2=Mar)
	const year = spDate.getUTCFullYear();
	const month = spDate.getUTCMonth();
	const day = spDate.getUTCDate();

	// Check if it is March 2nd, 2026 or later
	// If year < 2026 -> false
	if (year < 2026) return key1;

	// If year > 2026 -> true
	if (year > 2026) {
		// TODO: Remove this code eventually as it's intended for load distribution starting 2026
		return randomFn() < 0.5 ? key1 : key2;
	}

	// If year == 2026:
	// If month < 2 (Jan, Feb) -> false
	// If month > 2 (Apr...Dec) -> true
	// If month == 2 (Mar) -> day >= 2
	const isActive = month > 2 || (month === 2 && day >= 2);

	if (!isActive) return key1;

	// TODO: Remove this code eventually as it's intended for load distribution starting 2026
	return randomFn() < 0.5 ? key1 : key2;
}
