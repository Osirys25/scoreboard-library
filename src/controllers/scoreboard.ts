import {Match} from '../models/match.ts';

/**
 * Represents a scoreboard that keeps track of matches.
 */
export abstract class Scoreboard {
    table: Match[];

    /**
     * Creates a new scoreboard instance.
     */
    constructor() {
        this.table = [];
    }

    /**
     * Adds a new match to the scoreboard.
     * @param {string} homeTeamName - The name of the home team.
     * @param {string} awayTeamName - The name of the away team.
     */
    abstract addMatch(homeTeamName: string, awayTeamName: string): void;

    /**
     * Gets the sorted scoreboard.
     * @abstract * @returns {Match[]} The sorted array of matches.
     */
    abstract getScoreboard(): Match[];
}
