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
});
