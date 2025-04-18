import {Scoreboard} from './scoreboard.ts';
import {Match} from '../models/match.ts';

/**
 * Class representing a live scoreboard.
 * @extends Scoreboard
 */
export class LiveScoreboard extends Scoreboard {
    /**
     * Adds a new match to the scoreboard.
     * @param {string} homeTeamName - The name of the home team.
     * @param {string} awayTeamName - The name of the away team.
     * @returns {void}
     */
    addMatch(homeTeamName: string, awayTeamName: string): void {
        this.table.push(new Match(homeTeamName, awayTeamName));
    }

    /**
     * Finds a match by its ID, removes it from the table, and returns the removed match.
     *
     * @param {string} id - The ID of the match to find and remove.
     * @returns {Match | null} - The removed match if found, otherwise null.
     */
    findAndFinishMatch(id: string): Match | null {
        const index = this.table.findIndex(element => element.id === id);

        if (index === -1) {
            return null;
        }

        const [removedElement] = this.table.splice(index, 1);
        return removedElement;
    }

    /**
     * Updates the score for a specific team in a match.
     *
     * @param {string} id - The identifier of the match to be updated.
     * @param {number | null} homeTeamScore - Score of the home team.
     * @param {number | null} awayTeamScore - Score of the away team.
     * @returns {boolean | null} Returns null if no match with the given identifier exists, otherwise updates the score.
     */
    updateMatch(
        id: string,
        homeTeamScore?: number | null,
        awayTeamScore?: number | null
    ): boolean | null {
        const index = this.table.findIndex(element => element.id === id);

        if (index === -1) {
            return null;
        }

        if (homeTeamScore) {
            this.table[index].updateHomeTeamScore(homeTeamScore);
        }

        if (awayTeamScore) {
            this.table[index].updateAwayTeamScore(awayTeamScore);
        }

        return true;
    }

    /**
     * Gets the sorted scoreboard.
     * @returns {Match[]} The sorted array of matches - from the newest to the oldest.
     */
    getScoreboard(): Match[] {
        return this.table.sort(
            (a: Match, b: Match): number =>
                b.createdAt.getTime() - a.createdAt.getTime()
        );
    }
}
