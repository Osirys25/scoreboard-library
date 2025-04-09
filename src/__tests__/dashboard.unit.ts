import {Dashboard} from '../dashboard';
import {LiveScoreboard} from '../controllers/livescoreboard';
import {SummaryScoreboard} from '../controllers/summaryscoreboard';
import {Match} from '../models/match';

jest.mock('../controllers/livescoreboard');
jest.mock('../controllers/summaryscoreboard');

describe('src > unit > Dashboard', () => {
    let dashboard: Dashboard;
    let mockLiveScoreboard: jest.Mocked<LiveScoreboard>;
    let mockSummaryScoreboard: jest.Mocked<SummaryScoreboard>;

    beforeEach(() => {
        mockLiveScoreboard =
            new LiveScoreboard() as jest.Mocked<LiveScoreboard>;
        mockSummaryScoreboard =
            new SummaryScoreboard() as jest.Mocked<SummaryScoreboard>;
        dashboard = new Dashboard();
        dashboard.liveBoard = mockLiveScoreboard;
        dashboard.summaryBoard = mockSummaryScoreboard;
    });

    it('should initialize liveBoard and summaryBoard', () => {
        expect(dashboard.liveBoard).toBeInstanceOf(LiveScoreboard);
        expect(dashboard.summaryBoard).toBeInstanceOf(SummaryScoreboard);
    });

    it('should finish match and add to summaryBoard if match exists', () => {
        const mockMatch = {
            id: '1',
            awayTeam: {
                id: '1',
                name: 'Team A',
                score: 0,
            },
            homeTeam: {
                id: '2',
                name: 'Team B',
                score: 0,
            },
        };
        mockLiveScoreboard.findAndFinishMatch.mockReturnValue(
            mockMatch as jest.Mocked<Match>
        );

        dashboard.finishMatch('1');

        expect(mockLiveScoreboard.findAndFinishMatch).toHaveBeenCalledWith('1');
        expect(mockSummaryScoreboard.addMatch).toHaveBeenCalledWith(mockMatch);
    });

    it('should throw error if match does not exist', () => {
        mockLiveScoreboard.findAndFinishMatch.mockReturnValue(null);

        expect(() => dashboard.finishMatch('1')).toThrow('No such match');
        expect(mockLiveScoreboard.findAndFinishMatch).toHaveBeenCalledWith('1');
        expect(mockSummaryScoreboard.addMatch).not.toHaveBeenCalled();
    });
});
