import { CreditRating } from "./credit-rating";

export interface Company {
    name: string;
    url: string;
    creditRating: CreditRating; 
}