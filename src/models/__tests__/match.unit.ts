import {Match} from '../match.ts';
import {generateUUID} from '../../utils';

jest.mock('../../utils', () => ({
    generateUUID: jest.fn(),
}));

describe('src > models > unit > Match', () => {
    beforeEach(() => {
        (generateUUID as jest.Mock).mockClear();
    });

    it('should create a Match instance with correct properties', () => {
        (generateUUID as jest.Mock)
            .mockReturnValueOnce('match-id')
            .mockReturnValueOnce('home-team-id')
            .mockReturnValueOnce('away-team-id');

        const match = new Match('Home Team', 'Away Team');

        expect(match.id).toBe('match-id');
        expect(match.createdAt).toBeInstanceOf(Date);
        expect(match.homeTeam).toEqual({
            id: 'home-team-id',
            name: 'Home Team',
            score: 0,
        });
        expect(match.awayTeam).toEqual({
            id: 'away-team-id',
            name: 'Away Team',
            score: 0,
        });
    });

    it('should call generateUUID three times', () => {
        new Match('Home Team', 'Away Team');
        expect(generateUUID).toHaveBeenCalledTimes(3);
    });

    it('should update home team score correctly', () => {
        const match = new Match('Team A', 'Team B');
        match.updateHomeTeamScore(10);

        expect(match.homeTeam.score).toBe(10);
    });

    it('should update away team score correctly', () => {
        const match = new Match('Team A', 'Team B');
        match.updateAwayTeamScore(15);

        expect(match.awayTeam.score).toBe(15);
    });

    it('should throw an error if the new score is not a number', () => {
        const match = new Match('Team A', 'Team B');

        expect(() => match.updateHomeTeamScore(NaN)).toThrow('Invalid score');
    });

    it('should throw an error if the new score is less than or equal to the current score', () => {
        const match = new Match('Team A', 'Team B');
        match.updateHomeTeamScore(10);

        expect(() => match.updateHomeTeamScore(5)).toThrow('Invalid score');
    });
});
