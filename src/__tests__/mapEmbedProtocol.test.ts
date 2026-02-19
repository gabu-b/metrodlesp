import { describe, expect, test } from "vitest";
import { buildMapIframeKey, buildMapUpdateMessage, mapParamsEqual, type MapParams } from "../map/embedProtocol";

describe("map embed protocol", () => {
	test("buildMapUpdateMessage parses known lines and preserves state fields", () => {
		const params: MapParams = {
			showLines: true,
			bearing: 37,
			knownCsv: "1, 2,,3 , ",
			interactive: false,
		};

		expect(buildMapUpdateMessage(params)).toEqual({
			type: "metrodle-map-update",
			showLines: true,
			knownLines: ["1", "2", "3"],
			bearing: 37,
			interactive: false,
		});
	});

	test("mapParamsEqual includes interactive flag in equality", () => {
		const base: MapParams = {
			showLines: true,
			bearing: null,
			knownCsv: "1,2",
			interactive: false,
		};
		const changedInteractive: MapParams = { ...base, interactive: true };

		expect(mapParamsEqual(base, { ...base })).toBe(true);
		expect(mapParamsEqual(base, changedInteractive)).toBe(false);
	});

	test("buildMapIframeKey is stable across dynamic map param changes", () => {
		const key1 = buildMapIframeKey("station-123", "/assets/lines.geojson", "abc");
		const key2 = buildMapIframeKey("station-123", "/assets/lines.geojson", "abc");

		expect(key1).toBe(key2);
	});

	test("buildMapIframeKey changes only when static map context changes", () => {
		const base = buildMapIframeKey("station-123", "/assets/lines.geojson", "abc");
		const otherStation = buildMapIframeKey("station-999", "/assets/lines.geojson", "abc");
		const otherData = buildMapIframeKey("station-123", "/assets/other-lines.geojson", "abc");
		const otherKey = buildMapIframeKey("station-123", "/assets/lines.geojson", "def");

		expect(otherStation).not.toBe(base);
		expect(otherData).not.toBe(base);
		expect(otherKey).not.toBe(base);
	});
});
