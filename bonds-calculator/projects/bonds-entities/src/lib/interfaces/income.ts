import dayjs from "dayjs";
import { Money } from "shared";

export abstract class Income {

}

export interface IncomeConfig {
    readonly name: string;
    cost: Money;
}

export abstract class StockIncome extends Income {
    constructor(
        public readonly purchaseDate: dayjs.Dayjs,
        public readonly config: IncomeConfig,
    ){
        super();
    }

    abstract getCost(): Money;
    abstract getIncome(): Money;

}