import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { assertExhausted, Money, Percent, RepetitionType } from 'shared';
import { IncomeConfig, StockIncome } from './interfaces/income';

export interface BondConfig extends IncomeConfig {
    ticket: BondTicket;
    readonly issueData: dayjs.Dayjs;
    rep: RepetitionType;
    readonly maturityDate: dayjs.Dayjs;
}

export class Bond extends StockIncome {
    constructor(
        public override readonly purchaseDate: dayjs.Dayjs,
        public override config: BondConfig,
    ) {
        super(purchaseDate, config);
    }

    updateCost(): void {

    }

    override getCost(): Money {
        return this.config.cost;
    }

    override getIncome(): Money {
        return Money.multiplyBy(this.config.ticket.cost, this.config.rep.leftOperationsAmount);
    }
}

export class PortfolioItem {
    constructor(
        public incomes: StockIncome[],
    ) {

    }

    getGroupCost(): Money {
        let result: Money = new Money();

        for (const income of this.incomes){
            result.addMoney(income.getCost());
        }

        return result;
    }

    getGroupIncome(): Money {
        let result: Money = new Money();

        for (const income of this.incomes){
            result.addMoney(income.getIncome());
        }

        return result;
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