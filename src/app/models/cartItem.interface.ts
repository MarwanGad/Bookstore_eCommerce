import { bookInterface } from './book.interface';
export interface cartItemInterface extends bookInterface {
    quantity: number;
}