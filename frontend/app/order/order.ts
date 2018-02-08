import { Cinema } from '../cinema/cinema';
import { Movie } from '../movie/movie';
export class Order {
    _id: string;
    ticketCount: number;
    orderDate: Date;
    cinema: Cinema;
    movie: Movie;
    reviewContent: string;
    reviewRating: number;
}