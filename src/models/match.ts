import {generateUUID} from '../utils';

type Team = {
    id: string;
    name: string;
    score: number;
};

/**
 * Represents a match between two teams.
 */
export class Match {
    id: string;
    createdAt: Date;
    homeTeam: Team;
    awayTeam: Team;

    /**
     * Creates a new match instance.
     * @param {string} homeTeamName - The name of the home team.
     * @param {string} awayTeamName - The name of the away team.
     */
    constructor(homeTeamName: string, awayTeamName: string) {
        this.id = generateUUID();
        this.createdAt = new Date();
        this.homeTeam = {
            id: generateUUID(),
            name: homeTeamName,
            score: 0,
        } as Team;
        this.awayTeam = {
            id: generateUUID(),
            name: awayTeamName,
            score: 0,
        } as Team;
    }

    /**
     * Updates the score of a given team.
     * @param {Team} team - The team whose score is to be updated.
     * @param {number} score - The new score.
     * @throws Will throw an error if the score is not a number or is less than or equal to the current score.
     */
    updateTeamScore(team: {score: number}, score: number) {
        if (isNaN(score) || score <= team.score) {
            throw new Error('Invalid score');
        }
        team.score = score;
    }

    /**
     * Updates the score of the home team.
     * @param {number} score - The new score for the home team.
     */
    updateHomeTeamScore(score: number) {
        this.updateTeamScore(this.homeTeam, score);
    }

    /**
     * Updates the score of the away team.
     * @param {number} score - The new score for the away team.
     */
    updateAwayTeamScore(score: number) {
        this.updateTeamScore(this.awayTeam, score);
    }
}
