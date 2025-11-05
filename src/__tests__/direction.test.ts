import { test, expect } from "vitest";
import { directionArrowSymbol } from "../logic";

test("directionArrowSymbol returns empty when coords missing", () => {
	expect(directionArrowSymbol({ lat: 1, lon: 1 }, {})).toBe("");
	expect(directionArrowSymbol({}, { lat: 1, lon: 1 })).toBe("");
});

test("directionArrowSymbol cardinal directions", () => {
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: 1, lon: 0 })).toBe("↑");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: -1, lon: 0 })).toBe("↓");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: 0, lon: 1 })).toBe("→");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: 0, lon: -1 })).toBe("←");
});

test("directionArrowSymbol intercardinal directions", () => {
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: 1, lon: 1 })).toBe("↗");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: -1, lon: 1 })).toBe("↘");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: -1, lon: -1 })).toBe("↙");
	expect(directionArrowSymbol({ lat: 0, lon: 0 }, { lat: 1, lon: -1 })).toBe("↖");
});
