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
