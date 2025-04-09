import {Match} from '../models/match.ts';

export abstract class Scoreboard {
    table: Match[];

    constructor() {
        this.table = [];
    }

    abstract addMatch(homeTeamName: string, awayTeamName: string): void;
}
