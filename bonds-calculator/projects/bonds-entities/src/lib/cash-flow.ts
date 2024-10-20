import { assertExhausted, Money, Percent, RUSSIAN_CURRENCY } from "shared";
import { BondPortfolioItem } from "./bond";

export abstract class CashFlow {
    constructor(
        protected _amount: number,
        protected _items: BondPortfolioItem[],
    ) { }
}

export class BondsMontlyCashFlow extends CashFlow {
    constructor(
        protected override _amount: number,
        protected override _items: BondPortfolioItem[],
    ) {
        super(_amount, _items);
    }

    //TODO: 
    //1. create tests for all methods below
    //2. think about method decorators (min duration, per year, in roubles, in percents,)
    summaryCost(): Money {
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getSummaryCost());
        }

        return result;
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