import { Station } from "../stationLoader";

export const STATIONS: Station[] = [
	{ id: "station1", name: "Station One", lines: ["1"], wikidataId: "Q1" },
	{ id: "station2", name: "Station Two", lines: ["2"], wikidataId: "Q2" },
	{ id: "Consolação", name: "Consolação", lines: ["2"], wikidataId: "Q3" },
	{ id: "Paulista", name: "Paulista", lines: ["4"], wikidataId: "Q4" },
	{ id: "Luz", name: "Luz", lines: ["1", "4"], wikidataId: "Q5" },
	{ id: "República", name: "República", lines: ["3", "4"], wikidataId: "Q6" },
	{ id: "Clínicas", name: "Clínicas", lines: ["2"], wikidataId: "Q7" },
	{ id: "São Bento", name: "São Bento", lines: ["1"], wikidataId: "Q8" },
];
