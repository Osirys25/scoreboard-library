import {generateUUID} from '../utils';

type Team = {
    id: string;
    name: string;
    score: number;
};

export class Match {
    id: string;
    createdAt: Date;
    homeTeam: Team;
    awayTeam: Team;

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

    updateTeamScore(team: {score: number}, score: number) {
        if (isNaN(score) || score <= team.score) {
            throw new Error('Invalid score');
        }
        team.score = score;
    }

    updateHomeTeamScore(score: number) {
        this.updateTeamScore(this.homeTeam, score);
    }

    updateAwayTeamScore(score: number) {
        this.updateTeamScore(this.awayTeam, score);
    }
}
