import dayjs from "dayjs";
import { assertExhausted } from "../../utils";
import { Entity } from "../abstract/entity";
import { Duration } from "../duration";
import dayOfYear from 'dayjs/plugin/dayOfYear'

export abstract class RepetitionType implements Entity<Duration>{
    protected _operationsAmount: number = 0;
    protected _daysUntilNextOperation: number = 0;
    value: Duration = new Duration();

    //copy logic form FinanceApp
    get leftOperationsAmount(): number {
        assertExhausted();
        return 1;
    }

    protected abstract get repetitionPeriodDaysAmount(): number;

    get daysUntilNextOperation(): number {
        return this.repetitionPeriodStartDate.dayOfYear() % this.repetitionPeriodDaysAmount;
    }

    protected get repetitionPeriodStartDate(): dayjs.Dayjs {
        let result: dayjs.Dayjs = new dayjs.Dayjs();

        if (this.value.startDate.isBefore(result)) {
            result = this.value.startDate;
        }

        return result;
    }
}