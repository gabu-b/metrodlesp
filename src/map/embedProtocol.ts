export type MapParams = {
	showLines: boolean;
	bearing: number | null;
	knownCsv: string | null;
	interactive: boolean;
};

export type MapUpdateMessage = {
	type: "metrodle-map-update";
	showLines: boolean;
	knownLines: string[];
	bearing: number | null;
	interactive: boolean;
};

export function mapParamsEqual(a: MapParams | null, b: MapParams | null): boolean {
	if (a === b) return true;
	if (!a || !b) return false;
	return (
		a.showLines === b.showLines &&
		a.bearing === b.bearing &&
		a.knownCsv === b.knownCsv &&
		a.interactive === b.interactive
	);
}

export function knownLinesFromCsv(csv: string | null): string[] {
	if (!csv) return [];
	return csv
		.split(",")
		.map(item => item.trim())
		.filter(Boolean);
}

export function buildMapUpdateMessage(params: MapParams): MapUpdateMessage {
	return {
		type: "metrodle-map-update",
		showLines: params.showLines,
		knownLines: knownLinesFromCsv(params.knownCsv),
		bearing: params.bearing,
		interactive: params.interactive,
	};
}

export function buildMapIframeKey(solutionId: string, dataUrl: string, maptilerKey?: string | null): string {
	return `${solutionId}|${dataUrl}|${maptilerKey ?? ""}`;
}
