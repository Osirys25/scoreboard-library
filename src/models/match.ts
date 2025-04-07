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
}
