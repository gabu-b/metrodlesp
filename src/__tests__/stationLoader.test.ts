
import { test, expect } from 'vitest';
import { loadStations } from '../stationLoader';
import { LINES } from '../lines';

test('loadStations returns well-formed stations and valid lines', async () => {
    const stations = await loadStations();
    expect(stations.length).toBeGreaterThan(0);
    const station = stations[0];
    expect(station.id).toBeTypeOf('string');
    expect(station.name).toBeTypeOf('string');
    expect(Array.isArray(station.lines)).toBe(true);
    station.lines.forEach(lineId => {
        expect(lineId in LINES).toBe(true);
    });
});

test('loadStations cache returns same reference on subsequent calls', async () => {
    const stations1 = await loadStations();
    const stations2 = await loadStations();
    expect(stations1).toBe(stations2);
});

test('LINES integrity: ids are numeric-like and have name/color', () => {
    Object.values(LINES).forEach(line => {
        expect(line.id).toMatch(/^[0-9]+$/);
        expect(line.name).toBeTypeOf('string');
        expect(line.color).toMatch(/^#[0-9a-f]{6}$/);
    });
});
