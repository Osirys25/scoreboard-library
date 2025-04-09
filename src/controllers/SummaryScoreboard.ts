import {Scoreboard} from './scoreboard.ts';
import {Match} from '../models/match.ts';

export class SummaryScoreboard extends Scoreboard {
    addMatch(match: Match): void {
        this.table.push(match);
    }

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
