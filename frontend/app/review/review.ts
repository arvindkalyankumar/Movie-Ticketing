import { Order } from '../order/order';

export class Review {
    _id: string;
    order: Order;
    content: string;
    rating: number;
    date: Date;
    user: any;
}