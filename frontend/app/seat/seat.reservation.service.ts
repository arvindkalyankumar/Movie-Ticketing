import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AbstractService } from '../shared/abstract.service';

@Injectable()

export class SeatReservationService extends AbstractService {
    confirmSeatsTable = [];
    userName: any = " ";
    seats: any = " ";
    private orderUrl = '/order';  // URL to web API

    constructor(private http: Http) {
        super();
    }

    getUserName() {
        return localStorage.getItem('currentUser');
    }

    getSeatConfirmed() {
        let temp = 0;
        for (var i = 0; i < this.confirmSeatsTable.length; i++) {
            temp = temp + this.confirmSeatsTable[i].len;
        }
        return temp;
    }

    setSeatConfirmed(confirmSeats) {
        this.confirmSeatsTable.push({
            name: this.getUserName(),
            len: confirmSeats.length,
            seats: confirmSeats
        })
    }

    confirmOrder(name, seats, movieId, cinemaId, calDate) {
        this.confirmSeatsTable = [];
        const body = JSON.stringify({
            user: name,
            ticketCount: seats,
            orderDate: calDate,
            movie: movieId,
            cinema: cinemaId
        });
        return this
            .http.post(`${this.backendUrl.concat(this.orderUrl)}`, body, this.getRequestOptions())
            .map((response: Response) => {
                return response;
            });
    }

}