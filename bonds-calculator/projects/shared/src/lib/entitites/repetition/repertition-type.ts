import { Entity } from "../abstract/entity";
import { Duration } from "../duration";

export abstract class RepetitionType implements Entity<Duration>{
    protected _operationsAmount: number = 0;
    protected _daysUntilNextOperation: number = 0;
    value: Duration = new Duration();

    //copy logic form FinanceApp
}