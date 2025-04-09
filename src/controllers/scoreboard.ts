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
     * Gets the sorted scoreboard.
     * @abstract * @returns {Match[]} The sorted array of matches.
     */
    abstract getScoreboard(): Match[];
}
