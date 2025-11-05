
import { test, expect } from 'vitest';
import { getKnownLineKnowledge } from '../logic';
import { STATIONS } from './testUtils';
import { GameState } from '../state';

test('getKnownLineKnowledge confirms and eliminates lines based on guesses', () => {
    const gameState: GameState = {
        dateKey: '2025-11-05',
        solutionId: 'São Bento',
        guesses: ['Luz'],
        status: 'playing',
    };
    const knowledge = getKnownLineKnowledge(gameState, STATIONS);
    expect(knowledge.confirmed).toEqual(new Set(['1']));
    expect(knowledge.eliminated).toEqual(new Set(['4']));
});
