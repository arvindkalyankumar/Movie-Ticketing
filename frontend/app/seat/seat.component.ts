import { Component, OnInit } from '@angular/core';
import { SeatReservationService } from './seat.reservation.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading clearfix">
                            <h4 class="panel-title pull-left">Name:
                                {{seatReservationService.getUserName()}}</h4>
                        </div>
                        <div class="panel-body">
                            <p class="list-group-item-text pull-left">Seats:
                                {{seatReservationService.getSeatConfirmed()}}</p>
                            <p class="list-group-item-text pull-right"></p>
                        </div>
                        <div class="panel-footer clearfix">
                            <div class="pull-left">
                                <span>
                                    <button (click)="postOrder()"
                                            class="btn btn-info order-button pull-left">
                                        Book
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <seat-plan class="seatPlan"></seat-plan>
    `
    ,
    styleUrls: ['./seat.component.css']

})

export class SeatComponent implements OnInit {

    values = '';
    numbers = '';

    cinemaId: string;
    movieId: string;
    cal: string;
    errorMessage: string;

    constructor(private seatReservationService: SeatReservationService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.cinemaId = params['cinema'];
            this.movieId = params['movie'];
            console.log(this.cinemaId, this.movieId);
        });
        var date = new Date();
        this.cal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    postOrder() {
        this.seatReservationService.confirmOrder(this.seatReservationService.getUserName(), this.seatReservationService.getSeatConfirmed(), this.movieId, this.cinemaId, this.cal)
            .subscribe(
                response => {
                    console.log(response);
                    this.redirect();
                },
                error => this.errorMessage = <any>error);
    }

    redirect() {
        this.router.navigate(['/order']);
    }
}