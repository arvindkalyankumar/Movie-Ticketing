import { Component, OnInit } from '@angular/core';
import { Review } from './review';
import { ReviewService } from './review.service';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDate } from '../shared/util';

@Component({
    selector: 'review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
    providers: [ReviewService]
})

export class ReviewComponent implements OnInit {

    errorMessage: string;
    reviews: Review[];

    format = formatDate;

    constructor(private reviewService: ReviewService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            let cinemaId = params['cinema'];
            this.getReviews(cinemaId);
        });
    }

    getReviews(cinemaId: string) {
        this.reviewService.getReviews(cinemaId)
            .subscribe(
                reviews => {
                    this.reviews = reviews
                },
                error => this.errorMessage = <any>error);
    }

}