import * as dayjs from 'dayjs';
import { BondTicket } from './bond-ticket';
import { RepetitionType } from 'shared';

export abstract class Bond {
    constructor(
        public readonly name: string,
        public cost: number,        
        public ticket: BondTicket,
        public readonly issueData: dayjs.Dayjs,
        public rep: RepetitionType
    ) {

    }
}