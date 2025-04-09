import {Scoreboard} from './scoreboard.ts';
import {Match} from '../models/match.ts';

export class LiveScoreboard extends Scoreboard {
    addMatch(homeTeamName: string, awayTeamName: string): void {
        this.table.push(new Match(homeTeamName, awayTeamName));
    }

    getScoreboard(): Match[] {
        return this.table.sort(
            (a: Match, b: Match): number =>
                b.createdAt.getTime() - a.createdAt.getTime()
        );
    }
}
