import { roundFloatByDigits } from "../../utils";

export class Percent {
    constructor(
        public readonly amount: number
    ) {
        this.amount = this.amount / 100;
    }

    format(): string {
        return `${roundFloatByDigits(this.amount, 2)}`
    }
}