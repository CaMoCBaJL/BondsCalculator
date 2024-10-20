import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { assertExhausted, Currency, Money, Percent, RepetitionType } from 'shared';
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
        result.addMoney(this.getCostIncome());

        return result;
    }

    //Доходность с купонов
    getTicketsIncome(paymentAmount: number = this.config.rep.leftOperationsAmount): Money {
        return Money.multiplyBy(this.config.ticket.amount, paymentAmount);
    }

    //Доходность с разницы номинала
    getCostIncome(): Money {
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
    getSummaryCost(): Money {
        let result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getCost());
        }

        return result;
    }

    //Суммарная доходность за полный срок владения
    getSummaryIncomeForFullDuration(): Money {
        let result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getIncome());
        }

        return result;
    }

    get currency(): Currency {
        return this.incomes[0].config.cost.currency;
    }

    //Минимальное количество выплат по купонам
    getMinimalTicketPaymentAmount(): number {
        let result: number = Number.MAX_SAFE_INTEGER;

        for (const income of this.incomes) {
            if (income.config.rep.leftOperationsAmount < result) {
                result = income.config.rep.leftOperationsAmount;
            }
        }

        return result;
    }

    //Суммарная доходность за минимальный срок владения
    getSummaryIncomeForMinimalDuration(): Money {
        let result: Money = new Money();
        const minmalTickePaymentAmount: number = this.getMinimalTicketPaymentAmount();

        for (const income of this.incomes) {
            result.addMoney(income.getIncome(minmalTickePaymentAmount));
        }

        return result;
    }

    //Прибыль с купонов
    getTicketPaymentsForMinimalDuration(): Money {
        const result: Money = new Money();

        for (const income of this.incomes) {
            result.addMoney(income.getTicketsIncome());
        }

        return result;
    }

    //Чистая прибыль за полный срок владения
    getNetProfit(): Money {
        const result: Money = this.getSummaryIncomeForFullDuration();
        result.substractMoney(this.getSummaryCost());

        return result;
    }

    //Чистая прибыль за минимальный срок владения
    getNetProfitForMinimalDuration(): Money {
        const result: Money = this.getSummaryIncomeForMinimalDuration();
        result.substractMoney(this.getSummaryCost());

        return result;
    }

    //Мин кол-во купонов для отбива вложений
    getMinTicketAmountToROI(): number {
        return Money.divide(this.getSummaryCost(), Money.multiplyBy(this.incomes[0].config.ticket.amount, this.incomes.length));
    }

    //Доходность / год (Р) за полный срок владения
    getYieldPerYearInRoubles(): Money {
        return Money.split(this.getNetProfit(), this.incomes[0].config.rep.operationsPerYearAmount);
    }

    //Доходность / год (%) за полный срок владения
    getYieldPerYearInPercent(): Percent {
        return Percent.createFromMoney(this.getNetProfit(), this.getYieldPerYearInRoubles());
    }

    //Доходность / год (Р) за минимальный срок владения
    getYieldForMinimalDurationInRoubles(): Money {
        return Money.split(this.getNetProfitForMinimalDuration(), this.getMinimalTicketPaymentAmount());
    }

    //Доходность / год (%) за минимальный срок владения
    getYieldForMinimalDurationInPercent(): Percent {
        return Percent.createFromMoney(this.getNetProfitForMinimalDuration(), this.getYieldForMinimalDurationInRoubles());
    }
}