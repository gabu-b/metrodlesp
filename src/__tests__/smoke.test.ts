
import { test, expect } from 'vitest';
import { normalize, directionArrowSymbol } from '../logic';

test('normalize removes diacritics and lowercases', () => {
    expect(normalize('São Bento')).toBe('sao bento');
});

test('directionArrowSymbol basic behavior', () => {
    const from = { lat: -23.5505, lon: -46.6333 }; // São Paulo
    const to = { lat: -22.9068, lon: -43.1729 }; // Rio de Janeiro
    expect(directionArrowSymbol(from, to)).toBe('→');
});
