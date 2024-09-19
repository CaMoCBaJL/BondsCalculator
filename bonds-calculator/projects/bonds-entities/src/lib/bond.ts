import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { assertExhausted, Money, Percent, RepetitionType } from 'shared';
import { StockIncome } from './interfaces/income';

export interface BondConfig {
    readonly name: string;
    cost: Money;
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

    getGroupCost(): Money {
        assertExhausted();
    }

    getGroupIncome(): Money {
        assertExhausted();
    }

    getGroupIncomeAfterCost(): Money {
        assertExhausted();
    }

    getGroupLeastTicketPaymentAmount(): number {
        assertExhausted();
    }

    getGroupTicketPaymentsForMinimalDuration(): Money {
        assertExhausted();
    }

    getGroupSummaryIncome(): Money {
        assertExhausted();
    }

    getGroupNetProfit(): Money {
        assertExhausted();
    }

    getGroupNetProfitForMinimalDuration(): Money {
        assertExhausted();
    }

    getGroupMinTicketAmountToROI(): number {
        assertExhausted();
    }

    getGroupMinMonthAmountToROI(): number {
        assertExhausted();
    }


    //Доходность / год (Р)
    getGroupYieldPerYearInRoubles(): Money {
        assertExhausted();
    }

    //Доходность / год (%)
    getGroupYieldPerYearInPercent(): Percent {
        assertExhausted();
    }

    //Доходность / год (Р)
    getGroupYieldPerYearInRoublesForMinimalDuration(): Money {
        assertExhausted();
    }

    //Доходность / год (%)
    getGroupYieldPerYearInPercentForMinimalDuration(): Percent {
        assertExhausted();
    }
}