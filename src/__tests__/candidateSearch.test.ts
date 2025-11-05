import { test, expect } from "vitest";
import { searchCandidates } from "../logic";
import { STATIONS } from "./testUtils";
import { LINES } from "../lines";

test("candidate search by station name is diacritics-insensitive and sorted", () => {
	const results = searchCandidates("sao bento", STATIONS, LINES);
	expect(results.map(s => s.name)).toEqual(["São Bento"]);
});

test("candidate search by line number and name", () => {
	const results = searchCandidates("Verde", STATIONS, LINES);
	expect(results.length).toBeGreaterThan(0);
	results.forEach(s => expect(s.lines).toContain("2"));
});
