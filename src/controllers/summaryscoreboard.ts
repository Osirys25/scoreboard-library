import {Scoreboard} from './scoreboard.ts';
import {Match} from '../models/match.ts';

/**
 * The SummaryScoreboard class extends the Scoreboard class, adding functionality
 * to manage and sort matches based on their scores.
 */
export class SummaryScoreboard extends Scoreboard {
    /**
     * Adds a new match to the scoreboard.
     * @param {Match} match - The match object to add.
     * @returns {void}
     */
    addMatch(match: Match): void {
        this.table.push(match);
    }

    /**
     * Returns a sorted array of matches based on their scores.
     * Matches are sorted in descending order by the total score of both teams.
     * In case of a tie, matches are sorted by start time (newest first).
     * @returns {Match[]} - The sorted array of matches.
     */
    getScoreboard(): Match[] {
        return this.table.sort((a: Match, b: Match) => {
            const totalScoreA: number = a.homeTeam.score + a.awayTeam.score;
            const totalScoreB: number = b.homeTeam.score + b.awayTeam.score;

            if (totalScoreA !== totalScoreB) {
                return totalScoreB - totalScoreA; // Sort by total score descending
            } else {
                return b.createdAt.getTime() - a.createdAt.getTime(); // Sort by start time descending
            }
        });
    }
}
