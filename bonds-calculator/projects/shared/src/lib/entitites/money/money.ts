import { Currency } from "./currency";
import { RUSSIAN_CURRENCY } from "./constants";
import { assertExhausted } from "../../utils";
import { roundFloatByDigits } from "../../utils/round-float";

export class Money {
    constructor(
        public readonly currency: Currency = RUSSIAN_CURRENCY,
        private _amountInCents: number = 0
    ) {
        if (this._amountInCents % 1 !== 0) {
            assertExhausted('Деньги должны быть в копейках!');
        }
    }

    get amountInCents(): number {
        return this._amountInCents;
    }

    get amountInFloat(): number {
        return roundFloatByDigits(this._amountInCents / 100, 2);
    }
}