import { assertExhausted, Money, Percent } from "shared";
import { PortfolioItem } from "./bond";

export abstract class CashFlow {
    constructor(
        protected _amount: number,
        protected _items: PortfolioItem[],
    ) { }
}

export class BondsMontlyCashFlow extends CashFlow {
    constructor(
        protected override _amount: number,
        protected override _items: PortfolioItem[],
    ) {
        super(_amount, _items);
    }

    //TODO: 
    //1. create tests for all methods below
    //2. think about method decorators (min duration, per year, in roubles, in percents,)
    summaryCost(): Money {
        assertExhausted();
    }

    getCashFlowSummaryIncome(): Money {
        assertExhausted();
    }

    getCashFlowNetProfit(): Money {
        assertExhausted();
    }

    getCashFlowNetProfitForMinimalDuration(): Money {
        assertExhausted();
    }

    getCashFlowMinTicketAmountToROI(): number {
        assertExhausted();
    }

    getCashFlowMinMonthAmountToROI(): number {
        assertExhausted();
    }

    getCashFlowpYieldPerYearInRoubles(): Money {
        assertExhausted();
    }

    getCashFlowYieldPerYearInPercent(): Percent {
        assertExhausted();
    }

    getCashFlowpYieldPerYearInRoublesForMinimalDuration(): Money {
        assertExhausted();
    }

    getCashFlowYieldPerYearInPercentForMinimalDuration(): Percent {
        assertExhausted();
    }
}