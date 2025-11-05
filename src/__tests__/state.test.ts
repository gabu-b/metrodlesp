import { test, expect } from "vitest";
import { loadState, saveState, loadStats, saveStats } from "../state";
import { STATIONS } from "./testUtils";

test("loadState initializes when none exists and persists across reloads", () => {
	const today = "2025-11-05";
	const state1 = loadState(today, STATIONS);
	expect(state1.dateKey).toBe(today);
	expect(state1.guesses).toEqual([]);
	expect(state1.status).toBe("playing");

	saveState(state1);
	const state2 = loadState(today, STATIONS);
	expect(state2).toEqual(state1);
});

test("loadState resets for a new day or solution change", () => {
	const today = "2025-11-05";
	const tomorrow = "2025-11-06";
	const state1 = loadState(today, STATIONS);
	state1.guesses.push("station1");
	saveState(state1);

	const state2 = loadState(tomorrow, STATIONS);
	expect(state2.dateKey).toBe(tomorrow);
	expect(state2.guesses).toEqual([]);
});

test("loadStats/saveStats roundtrip", () => {
	const stats1 = loadStats();
	stats1.played++;
	saveStats(stats1);
	const stats2 = loadStats();
	expect(stats2).toEqual(stats1);
});
