import { Currency } from "./currency";
import { RUSSIAN_CURRENCY } from "./constants";
import { assertExhausted } from "../../utils";
import { roundFloatByDigits } from "../../utils/round-float";

//TODO: try to refactor this decorator
// function withNaturalParams(target: unknown, propertyKey: string, descriptor: TypedPropertyDescriptor<number | bigint>) {
//     const originDescriptor = descriptor.value;

//     descriptor.value = ((...args: unknown[]) => {
//         // if (isNumericValue(args[0])) {
//         //     assertExhausted('Декоратор применим только к методам с параметрами типа number или bigint!');
//         // }

//         if (args[0] as number | bigint < 0){
//             assertExhausted('Декоратор применим только к методам с параметрами типа number или bigint!');
//         }

//         return originDescriptor;
//     }) as number | bigint | undefined
// }

// function isNumericValue(value: unknown) {
//     return Number.isNaN(value)
//         || (
//             Array.isArray(value)
//             && value.every((item: unknown) => typeof item === 'number' || typeof item === 'bigint')
//         );
// }

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
        if (cents < 0) {
            assertExhausted('Денег нет!');
        }

        if (cents % 1 !== 0) {
            assertExhausted('Копеек не может быть дробное число!');
        }

        this._amountInCents += cents;
    }

    addFloats(money: number): void {
        if (money < 0) {
            assertExhausted('Денег нет!');
        }

        this.addCents(roundFloatByDigits(money, 2) * 100);
    }

    /**
     * Возвращает новый объект денег с итоговым количеством.
     * @param money - деньги
     * @param times - сколько раз множить (times >= 0)
     * @returns итого
     */
    static multiplyBy(money: Money, times: number): Money {
        const result: Money = new Money();

        if (times < 0) {
            assertExhausted('Нельзя умножить в отрицательное количество раз!');
        }

        if (times % 1 !== 0) {
            assertExhausted('Число раз не может быть дробным!');
        }

        for (let i = 0; i < times; i++){
            result.addMoney(money);
        }

        return result;
    }
}