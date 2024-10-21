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
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getSummaryIncomeForFullDuration());
        }

        return result;
    }

    getCashFlowNetProfit(): Money {
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getNetProfit());
        }

        return result;
    }

    getCashFlowNetProfitForMinimalDuration(): Money {
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getNetProfitForMinimalDuration());
        }

        return result;
    }

    getCashFlowMinTicketAmountToROI(): number {
        let result: number = Number.MAX_SAFE_INTEGER;

        for (const item of this._items) {
            const minTicketAmountToROI: number = item.getMinTicketAmountToROI();

            if (result < minTicketAmountToROI) {
                result = minTicketAmountToROI;
            }
        }

        return result;
    }

    getCashFlowYieldPerYearInRoubles(): Money {
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getYieldPerYearInRoubles());
        }

        return result;
    }

    getCashFlowYieldPerYearInPercent(): Percent {
        return Percent.createFromMoney(this.getCashFlowNetProfit(), this.getCashFlowYieldPerYearInRoubles());
    }

    getCashFlowpYieldPerYearInRoublesForMinimalDuration(): Money {
        const result: Money = new Money(this._items[0].currency, 0);

        for (const item of this._items) {
            result.addMoney(item.getYieldForMinimalDurationInRoubles());
        }

        return result;
    }

    getCashFlowYieldPerYearInPercentForMinimalDuration(): Percent {
        return Percent.createFromMoney(this.getCashFlowNetProfitForMinimalDuration(), this.getCashFlowpYieldPerYearInRoublesForMinimalDuration());
    }
}