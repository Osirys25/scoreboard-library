import {SummaryScoreboard} from '../summaryscoreboard.ts';
import {Match} from '../../models/match.ts';

jest.mock('../../models/match', () => {
    return {
        Match: jest
            .fn()
            .mockImplementation(
                (homeTeamName: string, awayTeamName: string) => {
                    return {
                        homeTeam: {name: homeTeamName, score: 0},
                        awayTeam: {name: awayTeamName, score: 0},
                        createdAt: new Date(),
                    };
                }
            ),
    };
});

describe('src > controllers > unit > SummaryScoreboard', () => {
    let scoreboard: SummaryScoreboard;
    let match1: Match;
    let match2: Match;

    beforeEach(async () => {
        scoreboard = new SummaryScoreboard();
        match1 = new Match('Team A', 'Team B');

        await new Promise(r => setTimeout(r, 2000));

        match2 = new Match('Team C', 'Team D');
    });

    test('should add a match to the scoreboard', () => {
        scoreboard.addMatch(match1);
        expect(scoreboard.table).toContain(match1);
    });

    test('should return matches sorted by total score in descending order', () => {
        scoreboard.addMatch(match1);
        scoreboard.addMatch(match2);

        const sortedMatches = scoreboard.getScoreboard();

        expect(sortedMatches[0].homeTeam.name).toBe(match2.homeTeam.name);
        expect(sortedMatches[0].awayTeam.name).toBe(match2.awayTeam.name);

        expect(sortedMatches[1].homeTeam.name).toBe(match1.homeTeam.name);
        expect(sortedMatches[1].awayTeam.name).toBe(match1.awayTeam.name);
    });

    test('should sort matches by start time if scores are tied', async () => {
        await new Promise(r => setTimeout(r, 2000));

        const match3 = new Match('Team E', 'Team F');
        scoreboard.addMatch(match2);
        scoreboard.addMatch(match3);

        const sortedMatches = scoreboard.getScoreboard();

        expect(sortedMatches[0].homeTeam.name).toBe(match3.homeTeam.name);
        expect(sortedMatches[0].awayTeam.name).toBe(match3.awayTeam.name);

        expect(sortedMatches[1].homeTeam.name).toBe(match2.homeTeam.name);
        expect(sortedMatches[1].awayTeam.name).toBe(match2.awayTeam.name);
    });
});
