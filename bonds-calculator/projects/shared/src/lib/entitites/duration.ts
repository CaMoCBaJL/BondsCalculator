import * as dayjs from 'dayjs';

export class Duration {
    constructor(
        public readonly startDate: dayjs.Dayjs = new dayjs.Dayjs(),
        public readonly endDate: dayjs.Dayjs = new dayjs.Dayjs(),
    ) { }
}