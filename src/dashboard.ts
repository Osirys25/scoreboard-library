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

    updateLiveScoreboard(): void {}

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
