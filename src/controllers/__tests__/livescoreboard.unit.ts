import {LiveScoreboard} from '../livescoreboard.ts';

jest.mock('../../models/match', () => {
    return {
        Match: jest
            .fn()
            .mockImplementation(
                (homeTeamName: string, awayTeamName: string) => {
                    return {
                        homeTeam: {name: homeTeamName},
                        awayTeam: {name: awayTeamName},
                        createdAt: new Date(),
                        id: homeTeamName,
                    };
                }
            ),
    };
});

describe('src > controllers > unit > LiveScoreboard', () => {
    let scoreboard: LiveScoreboard;

    beforeEach(() => {
        scoreboard = new LiveScoreboard();
    });

    it('should initialize with an empty table', () => {
        expect(scoreboard.table).toEqual([]);
    });

    it('should add a match to the table', () => {
        scoreboard.addMatch('Team A', 'Team B');
        expect(scoreboard.table.length).toBe(1);

        expect(scoreboard.table[0].awayTeam.name).toEqual('Team B');
        expect(scoreboard.table[0].homeTeam.name).toEqual('Team A');
    });

    it('should return a sorted matches table - from the newest do the oldest', async () => {
        scoreboard.addMatch('Team C', 'Team D');

        await new Promise(r => setTimeout(r, 2000));

        scoreboard.addMatch('Team A', 'Team B');

        const result = scoreboard.getScoreboard();

        expect(result[0].awayTeam.name).toEqual('Team B');
        expect(result[0].homeTeam.name).toEqual('Team A');

        expect(result[1].awayTeam.name).toEqual('Team D');
        expect(result[1].homeTeam.name).toEqual('Team C');
    });

    it('should return the match and remove it from the table when the match is found', async () => {
        scoreboard.addMatch('Team C', 'Team D');

        await new Promise(r => setTimeout(r, 2000));

        scoreboard.addMatch('Team A', 'Team B');

        const result = scoreboard.findAndFinishMatch('Team A');
        expect(result?.id).toEqual('Team A');
        expect(scoreboard.table.length).toEqual(1);
    });

    test('should return null when the match is not found', async () => {
        scoreboard.addMatch('Team C', 'Team D');

        await new Promise(r => setTimeout(r, 2000));

        scoreboard.addMatch('Team A', 'Team B');

        const result = scoreboard.findAndFinishMatch('Team XYZ');
        expect(result).toBeNull();
        expect(scoreboard.table.length).toEqual(2);
    });
});
