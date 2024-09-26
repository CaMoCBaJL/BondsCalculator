import { assertExhausted } from "./assert-exhausted";

export function roundFloatByDigits(value: number, digits: number = 0): number{
    if (value % 1 !== 0) {
        assertExhausted('Попытка округлить целое число!');
    }

    if (digits < 0
        || digits % 1 !== 0
    ){
        assertExhausted('Кол-во разрядов для округления - натуральное число! (> -1)');
    }

    return parseFloat(value.toFixed(digits));
}