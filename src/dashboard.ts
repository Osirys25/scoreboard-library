import {LiveScoreboard} from './controllers/livescoreboard.ts';
import {SummaryScoreboard} from './controllers/summaryscoreboard.ts';
import {Match} from './models/match.ts';

/**
 * Class representing a dashboard with live scores and summary scores.
 */
export class Dashboard {
    /**
     * Live scoreboard.
     * @type {LiveScoreboard}
     */
    liveBoard: LiveScoreboard;

    /**
     * Summary scoreboard.
     * @type {SummaryScoreboard}
     */
    summaryBoard: SummaryScoreboard;

    /**
     * Creates an instance of Dashboard.
     * Initializes the live and summary scoreboards.
     */
    constructor() {
        this.liveBoard = new LiveScoreboard();
        this.summaryBoard = new SummaryScoreboard();
    }

    /**
     * Updates the live scoreboard for a specific match.
     *
     * @param {string} matchId - The identifier of the match to be updated.
     * @param {'away' | 'home'} team - The team whose score is to be updated ('away' or 'home').
     * @param {number} score - The new score to be assigned to the team.
     * @throws {Error} If no match with the given identifier exists.
     * @returns {void}
     */
    updateLiveScoreboard(
        matchId: string,
        team: 'away' | 'home',
        score: number
    ): void {
        const updatedMatch = this.liveBoard.updateMatch(matchId, team, score);

        if (!updatedMatch) {
            throw new Error('No such match');
        }
    }

    /**
     * Finishes the match with the given ID.
     * If the match is found and finished, adds it to the summary scoreboard.
     * Otherwise, throws an error.
     *
     * @param {string} id - The ID of the match to finish.
     * @throws {Error} If no match with the given ID exists.
     */
    finishMatch(id: string): void {
        const finishedMatch: Match | null =
            this.liveBoard.findAndFinishMatch(id);

        if (finishedMatch) {
            this.summaryBoard.addMatch(finishedMatch);
        } else {
            throw new Error('No such match');
        }
    }
}
