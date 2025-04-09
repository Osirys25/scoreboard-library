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
    addMatch(homeTeamName: string, awayTeamName: string) {
        this.table.push(new Match(homeTeamName, awayTeamName));
    }

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

    it('should add a match to the table', () => {
        scoreboard.addMatch('Team A', 'Team B');
        expect(scoreboard.table.length).toBe(1);

        expect(scoreboard.table[0]).toEqual({
            awayTeamName: 'Team B',
            homeTeamName: 'Team A',
        });
    });

    it('should return a matches table', () => {
        scoreboard.addMatch('Team C', 'Team D');

        expect(scoreboard.getScoreboard()).toEqual([
            {awayTeamName: 'Team D', homeTeamName: 'Team C'},
        ]);
    });
});
