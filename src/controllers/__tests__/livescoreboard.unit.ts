import {LiveScoreboard} from '../livescoreboard.ts';

const mockUpdateAwayTeamScore = jest.fn();
const mockUpdateHomeTeamScore = jest.fn();

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
                        updateAwayTeamScore: mockUpdateAwayTeamScore,
                        updateHomeTeamScore: mockUpdateHomeTeamScore,
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

    it('should update away team score if team is away', () => {
        scoreboard.addMatch('Team A', 'Team B');

        const awayTeamScore = 10;
        const id = 'Team A';
        const homeTeamScore = null;

        scoreboard.updateMatch(id, homeTeamScore, awayTeamScore);

        expect(mockUpdateAwayTeamScore).toHaveBeenCalledWith(awayTeamScore);
        expect(mockUpdateHomeTeamScore).not.toHaveBeenCalled();
    });

    it('should update home team score if team is home', () => {
        scoreboard.addMatch('Team A', 'Team B');

        const homeTeamScore = 20;
        const id = 'Team A';
        const awayTeamScore = null;

        scoreboard.updateMatch(id, homeTeamScore, awayTeamScore);

        expect(mockUpdateHomeTeamScore).toHaveBeenCalledWith(homeTeamScore);
        expect(mockUpdateAwayTeamScore).not.toHaveBeenCalled();
    });

    it('should return null if no match with the given id exists', () => {
        scoreboard.addMatch('Team A', 'Team B');

        const homeTeamScore = 20;
        const id = '12';
        const awayTeamScore = 10;

        const result = scoreboard.updateMatch(id, homeTeamScore, awayTeamScore);

        expect(result).toBeNull();
        expect(mockUpdateHomeTeamScore).not.toHaveBeenCalled();
        expect(mockUpdateAwayTeamScore).not.toHaveBeenCalled();
    });
});
