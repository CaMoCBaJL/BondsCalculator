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
        if (!this._amountInCents) {
            return this._amountInCents;
        }
        
        return roundFloatByDigits(this._amountInCents / 100, 2);
    }

    addMoney(money: Money): void {
        if (money.currency !== this.currency) {
            assertExhausted('Сложение денег в разных валютах не предусмотрено!');
        }

       this.addCents(money.amountInCents);
    }

    addCents(cents: number): void {
        if (cents < 0){
            assertExhausted('Денег нет!');
        }

        if (cents % 1 !== 0) {
            assertExhausted('Копеек не может быть дробное число!');
        }

        this._amountInCents += cents;
    }

    addFloats(money: number) {
        if (money < 0){
            assertExhausted('Денег нет!');
        }

        this.addCents(roundFloatByDigits(money, 2) * 100);
    }
}