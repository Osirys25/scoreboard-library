import {Dashboard} from '../dashboard';

describe('Dashboard Integration Tests', () => {
    const dashboard = new Dashboard();

    it('should initialize with empty live and summary scoreboards', () => {
        expect(dashboard.getLiveBoardState()).toEqual([]);
        expect(dashboard.getSummaryBoardState()).toEqual([]);
    });

    it('should add new matches to LiveBoard', () => {
        dashboard.liveBoard.addMatch('Team 1', 'Team 2');
        dashboard.liveBoard.addMatch('Team 2', 'Team 3');
        dashboard.liveBoard.addMatch('Team 3', 'Team 4');

        expect(dashboard.getLiveBoardState().length).toEqual(3);
        expect(dashboard.getSummaryBoardState()).toEqual([]);
    });

    it('should update live scoreboard for a specific match', () => {
        const liveBoardState = dashboard.getLiveBoardState();

        const exampleMatchToUpdate = liveBoardState[1];

        expect(exampleMatchToUpdate?.awayTeam.score).toBe(0);
        expect(exampleMatchToUpdate?.homeTeam.score).toBe(0);

        dashboard.updateLiveScoreboard(exampleMatchToUpdate.id, 'away', 10);
        dashboard.updateLiveScoreboard(exampleMatchToUpdate.id, 'home', 2);

        const liveBoardStateUpdated = dashboard.getLiveBoardState();

        const exampleMatchUpdated = liveBoardStateUpdated[1];

        expect(exampleMatchUpdated?.awayTeam.score).toBe(10);
        expect(exampleMatchUpdated?.homeTeam.score).toBe(2);
    });

    it('should finish matches and move it to summary scoreboard', () => {
        const liveBoardStateToFinish = dashboard.getLiveBoardState();
        dashboard.finishMatch(liveBoardStateToFinish[0].id);

        const liveBoardStateToFinishRefreshed = dashboard.getLiveBoardState();
        dashboard.finishMatch(liveBoardStateToFinishRefreshed[0].id);

        const liveBoardStateToFinishRefreshed2 = dashboard.getLiveBoardState();
        dashboard.finishMatch(liveBoardStateToFinishRefreshed2[0].id);

        expect(dashboard.getSummaryBoardState().length).toEqual(3);
        expect(dashboard.getLiveBoardState()).toEqual([]);
    });

    it('should throw error if trying to update non-existent match', () => {
        const matchId = 'nonExistentMatch';
        const team = 'home';
        const score = 10;

        expect(() => {
            dashboard.updateLiveScoreboard(matchId, team, score);
        }).toThrow('No such match');
    });

    it('should throw error if trying to finish non-existent match', () => {
        const matchId = 'nonExistentMatch';

        expect(() => {
            dashboard.finishMatch(matchId);
        }).toThrow('No such match');
    });
});
