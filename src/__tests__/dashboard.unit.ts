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

        mockLiveScoreboard.updateMatch = jest.fn();
        mockLiveScoreboard.getScoreboard = jest.fn();
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

    it('should update the score for the away team', () => {
        mockLiveScoreboard.updateMatch.mockReturnValue(true);

        const matchId = '1';
        const team = 'away';
        const score = 10;

        dashboard.updateLiveScoreboard(matchId, team, score);

        expect(mockLiveScoreboard.updateMatch).toHaveBeenCalledWith(
            matchId,
            team,
            score
        );
    });

    it('should update the score for the home team', () => {
        mockLiveScoreboard.updateMatch.mockReturnValue(true);

        const matchId = '2';
        const team = 'home';
        const score = 20;

        dashboard.updateLiveScoreboard(matchId, team, score);

        expect(mockLiveScoreboard.updateMatch).toHaveBeenCalledWith(
            matchId,
            team,
            score
        );
    });

    it('should throw an error if no match with the given id exists', () => {
        mockLiveScoreboard.updateMatch.mockReturnValue(null);

        const matchId = '3';
        const team = 'away';
        const score = 30;

        expect(() => {
            dashboard.updateLiveScoreboard(matchId, team, score);
        }).toThrow('No such match');
    });

    it('getLiveBoardState should return live scoreboard state', () => {
        mockLiveScoreboard.getScoreboard.mockReturnValue([
            {matchId: 1, score: '10-5'},
            {matchId: 2, score: '8-8'},
        ] as unknown as Match[]);

        const result = dashboard.getLiveBoardState();

        expect(result).toEqual([
            {matchId: 1, score: '10-5'},
            {matchId: 2, score: '8-8'},
        ]);
        expect(mockLiveScoreboard.getScoreboard).toHaveBeenCalled();
    });

    it('getSummaryBoardState should return summary scoreboard state', () => {
        mockSummaryScoreboard.getScoreboard.mockReturnValue([
            {matchId: 1, score: '10-5'},
            {matchId: 2, score: '8-8'},
        ] as unknown as Match[]);

        const result = dashboard.getSummaryBoardState();

        expect(result).toEqual([
            {matchId: 1, score: '10-5'},
            {matchId: 2, score: '8-8'},
        ]);
        expect(mockSummaryScoreboard.getScoreboard).toHaveBeenCalled();
    });
});
