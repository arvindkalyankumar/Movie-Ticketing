import { Component } from '@angular/core';
import { SeatReservationService } from './seat.reservation.service';

@Component({
  selector: 'seat-booked',
  template: `
    `
    ,
    styleUrls: ['./seat.component.css']
})

export class SeatBooked {
  constructor(private seatReservationService: SeatReservationService){}
}