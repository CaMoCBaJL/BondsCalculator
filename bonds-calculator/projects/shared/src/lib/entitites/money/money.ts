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

    substractMoney(money: Money): void {
        if (money.currency !== this.currency) {
            assertExhausted('Сложение денег в разных валютах не предусмотрено!');
        }

        this.substractCents(money.amountInCents);
    }

    substractCents(cents: number): void {
        if (cents < 0) {
            assertExhausted('Денег нет!');
        }

        if (cents % 1 !== 0) {
            assertExhausted('Копеек не может быть дробное число!');
        }

        this._amountInCents -= cents;
    }

    substractFloats(money: number): void {
        if (money < 0) {
            assertExhausted('Денег нет!');
        }

        this.substractCents(roundFloatByDigits(money, 2) * 100);
    }

    get copy(): Money {
        return new Money(this.currency, this._amountInCents);
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

    /**
     * Возвращает число, во сколько раз source > divider.
     * Результат округлен 2 дох знаков после запятой.
     */
    static divide(source: Money, divider: Money): number {
        if (source.currency !== divider.currency) {
            assertExhausted('Деление денег в разных валютах не предусмотрено!');
        }

        if (divider.amountInCents === 0) {
            assertExhausted('Нельзя делить на 0!');
        }

        if (source.amountInCents === 0) {
            assertExhausted('Ноль не разделить!');
        }

        return roundFloatByDigits(source.amountInCents / divider.amountInCents, 2);
    }
}