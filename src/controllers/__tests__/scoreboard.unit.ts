import {Scoreboard} from '../scoreboard.ts';
import {Match} from '../../models/match.ts';

jest.mock('../../models/match', () => {
    return {
        Match: jest
            .fn()
            .mockImplementation(
                (homeTeamName: string, awayTeamName: string) => {
                    return {homeTeamName, awayTeamName};
                }
            ),
    };
});

class TestScoreboard extends Scoreboard {
    getScoreboard(): Match[] {
        return this.table;
    }
}

describe('src > controllers > unit > Scoreboard', () => {
    let scoreboard: TestScoreboard;

    beforeEach(() => {
        scoreboard = new TestScoreboard();
    });

    it('should initialize with an empty table', () => {
        expect(scoreboard.table).toEqual([]);
    });

    it('should return a matches table', () => {
        expect(scoreboard.getScoreboard()).toEqual([]);
    });
});
