import { describe, it, expect } from "vitest";
import { selectMapTilerKey } from "../map/keys";

describe("selectMapTilerKey", () => {
	const key1 = "key1";
	const key2 = "key2";

	it("returns undefined if key1 is missing", () => {
		const date = new Date(Date.UTC(2026, 2, 2)); // Mar 2 2026
		expect(selectMapTilerKey(undefined, key2, date)).toBeUndefined();
		expect(selectMapTilerKey(undefined, undefined, date)).toBeUndefined();
	});

	it("returns key1 if key2 is missing", () => {
		const date = new Date(Date.UTC(2026, 2, 2)); // Mar 2 2026
		expect(selectMapTilerKey(key1, undefined, date)).toBe(key1);
	});

	it("returns key1 before March 2, 2026", () => {
		// Jan 1, 2026
		expect(selectMapTilerKey(key1, key2, new Date(Date.UTC(2026, 0, 1)))).toBe(key1);
		// Feb 28, 2026
		expect(selectMapTilerKey(key1, key2, new Date(Date.UTC(2026, 1, 28)))).toBe(key1);
		// Mar 1, 2026 (Month=2, Date=1)
		expect(selectMapTilerKey(key1, key2, new Date(Date.UTC(2026, 2, 1)))).toBe(key1);
		// Dec 31, 2025
		expect(selectMapTilerKey(key1, key2, new Date(Date.UTC(2025, 11, 31)))).toBe(key1);
	});

	it("returns key1 or key2 randomly on or after March 2, 2026", () => {
		const date = new Date(Date.UTC(2026, 2, 2)); // Mar 2 2026

		// Mock random < 0.5 -> key1
		expect(selectMapTilerKey(key1, key2, date, () => 0.4)).toBe(key1);

		// Mock random >= 0.5 -> key2
		expect(selectMapTilerKey(key1, key2, date, () => 0.6)).toBe(key2);
	});

	it("works for later years (2027+)", () => {
		// Jan 1, 2027
		const date = new Date(Date.UTC(2027, 0, 1));
		expect(selectMapTilerKey(key1, key2, date, () => 0.6)).toBe(key2);
	});
});
