import dayjs from "dayjs";

export abstract class Income {

}

export abstract class StockIncome extends Income {
    constructor(
        public readonly purchaseDate: dayjs.Dayjs
    ){
        super();
    }
}