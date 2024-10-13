import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { assertExhausted, Money, Percent, RepetitionType } from 'shared';
import { IncomeConfig, StockIncome } from './interfaces/income';

export interface BondConfig extends IncomeConfig {
    ticket: BondTicket;
    readonly issueData: dayjs.Dayjs;
    rep: RepetitionType;
    readonly maturityDate: dayjs.Dayjs;
    returnCost: Money;
}

export class Bond extends StockIncome {
    constructor(
        public override readonly purchaseDate: dayjs.Dayjs,
        public override config: BondConfig,
    ) {
        super(purchaseDate, config);
    }

    currentCost(): Money {
        assertExhausted();
    }

    override getCost(): Money {
        return this.config.cost;
    }

    //Суммарная доходность (купоны + номинал)
    override getIncome(paymentAmount: number = this.config.rep.leftOperationsAmount): Money {
        const result: Money = this.getTicketsIncome(paymentAmount);
        result.addMoney(this.getConstIncome());

        return result;
    }

    //Доходность с купонов
    getTicketsIncome(paymentAmount: number = this.config.rep.leftOperationsAmount): Money {
        return Money.multiplyBy(this.config.ticket.cost, paymentAmount);
    }

    //Доходность с разницы номинала
    getConstIncome(): Money {
        const result: Money = this.config.returnCost.copy;
        result.substractMoney(this.config.cost);

        return result;
    }
}

export class BondPortfolioItem {
    constructor(
        public incomes: Bond[],
    ) {

    }

    //Стоимость (на момент указанных цен)
    getGroupSummaryCost(): Money {
        let result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getCost());
        }

        return result;
    }

    //Суммарная доходность за полный срок владения
    getGroupSummaryIncomeForFullDuration(): Money {
        let result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getIncome());
        }

        return result;
    }

    //Минимальное количество выплат по купонам
    getGroupMinimalTicketPaymentAmount(): number {
        let result: number = Number.MAX_SAFE_INTEGER;

        for (const income of this.incomes) {
            if (income.config.rep.leftOperationsAmount < result) {
                result = income.config.rep.leftOperationsAmount;
            }
        }

        return result;
    }

    //Суммарная доходность за минимальный срок владения
    getGroupSummaryIncomeForMinimalDuration(): Money {
        let result: Money = new Money();
        const minmalTickePaymentAmount: number = this.getGroupMinimalTicketPaymentAmount();

        for (const income of this.incomes) {
            result.addMoney(income.getIncome(minmalTickePaymentAmount));
        }

        return result;
    }

    //Прибыль с купонов
    getGroupTicketPaymentsForMinimalDuration(): Money {
        const result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getTicketsIncome());
        }

        return result;
    }

    //Чистая прибыль за полный срок владения
    getGroupNetProfit(): Money {
        const result: Money = this.getGroupSummaryIncomeForFullDuration();
        result.substractMoney(this.getGroupSummaryCost());

        return result;
    }

    //Чистая прибыль за минимальный срок владения
    getGroupNetProfitForMinimalDuration(): Money {
        const result: Money = this.getGroupSummaryIncomeForMinimalDuration();
        result.substractMoney(this.getGroupSummaryCost());

        return result;
    }

    //Мин кол-во купонов для отбива вложений
    getGroupMinTicketAmountToROI(): number {
        assertExhausted();
    }

    //Мин кол-во месяцев владения для отбива вложений
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