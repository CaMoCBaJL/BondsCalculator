import { assertExhausted } from "shared";
import { PortfolioItem } from "./bond";
import { Company } from "./interfaces/company";

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
    //1. create money type (float with 2 digits) or increase amounts per 100 times (rouble = 100 pennies)
    //2. add entity for protfolio item group and incapsulate all related logic there
    //3. create tests for all methods below
    //4. think about percent entity
    //5. think about method decorators (min duration, per year, in roubles, in percents,)
    summaryCost(): number {
        assertExhausted();
    }

    groupByCompanies(): Map<Company, PortfolioItem[]> {
        assertExhausted();
    }

    getGroupCost(): number {
        assertExhausted();
    }

    getGroupIncome(): number {
        assertExhausted();
    }

    getGroupIncomeAfterCost(): number {
        assertExhausted();
    }

    getGroupLeastTicketPaymentAmount(): number {
        assertExhausted();
    }

    getGroupTicketPaymentsForMinimalDuration(): number {
        assertExhausted();
    }

    getGroupSummaryIncome(): number {
        assertExhausted();
    }

    getCashFlowSummaryIncome(): number {
        assertExhausted();
    }

    getGroupNetProfit(): number {
        assertExhausted();
    }

    getCashFlowNetProfit(): number {
        assertExhausted();
    }

    getGroupNetProfitForMinimalDuration(): number {
        assertExhausted();
    }

    getCashFlowNetProfitForMinimalDuration(): number {
        assertExhausted();
    }

    getGroupMinTicketAmountToROI(): number {
        assertExhausted();
    }

    getGroupMinMonthAmountToROI(): number {
        assertExhausted();
    }

    getCashFlowMinTicketAmountToROI(): number {
        assertExhausted();
    }

    getCashFlowMinMonthAmountToROI(): number {
        assertExhausted();
    }

    //Доходность / год (Р)
    getGroupYieldPerYearInRoubles(): number {
        assertExhausted();
    }

    //Доходность / год (%)
    getGroupYieldPerYearInPercent(): number {
        assertExhausted();
    }

    getCashFlowpYieldPerYearInRoubles(): number {
        assertExhausted();
    }

    getCashFlowYieldPerYearInPercent(): number {
        assertExhausted();
    }

    //Доходность / год (Р)
    getGroupYieldPerYearInRoublesForMinimalDuration(): number {
        assertExhausted();
    }

    //Доходность / год (%)
    getGroupYieldPerYearInPercentForMinimalDuration(): number {
        assertExhausted();
    }

    getCashFlowpYieldPerYearInRoublesForMinimalDuration(): number {
        assertExhausted();
    }

    getCashFlowYieldPerYearInPercentForMinimalDuration(): number {
        assertExhausted();
    }
}