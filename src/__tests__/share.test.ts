
import { expect, test } from 'vitest';
import { GameState } from '../state';
import { buildShareImageHTML } from '../logic';
import { Station } from '../stationLoader';
import { Line, LineId } from '../lines';

test('share image HTML structure', () => {
    const gameState: GameState = {
        dateKey: '2025-11-05',
        solutionId: 'station1',
        guesses: ['station2', 'station1'],
        status: 'won',
    };

    const stations: Station[] = [
        { id: 'station1', name: 'Station One', lines: ['1'], wikidataId: 'Q1' },
        { id: 'station2', name: 'Station Two', lines: ['2'], wikidataId: 'Q2' },
    ];

    const lines: Record<LineId, Line> = {
        '1': { id: '1', name: 'Line 1', color: '#ff0000' },
        '2': { id: '2', name: 'Line 2', color: '#00ff00' },
    };

    const distFromSolution = new Map<string, number>([
        ['Q1', 0],
        ['Q2', 1],
    ]);

    const html = buildShareImageHTML(gameState, stations, lines, distFromSolution, false);
    expect(html).toMatchSnapshot();
});
