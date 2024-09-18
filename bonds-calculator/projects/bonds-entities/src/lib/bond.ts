import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { RepetitionType } from 'shared';
import { StockIncome } from './interfaces/income';

export interface BondConfig {
    readonly name: string;
    cost: number;
    ticket: BondTicket;
    readonly issueData: dayjs.Dayjs;
    rep: RepetitionType;
    readonly maturityDate: dayjs.Dayjs;
}

export class Bond extends StockIncome {
    constructor(
        public override readonly purchaseDate: dayjs.Dayjs,
        public config: BondConfig,
    ) {
        super(purchaseDate);
    }

    updateCost(): void {

    }
}

export class PortfolioItem {
    constructor(
        public incomes: StockIncome[],
    ) {

    }
}