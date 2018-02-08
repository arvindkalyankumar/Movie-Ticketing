import { OnInit, Component } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from "../review/review";
import { ReviewService } from '../review/review.service';
import { formatDate } from '../shared/util';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    providers: [OrderService, ReviewService]
})

export class OrderComponent implements OnInit {

    errorMessage: string;
    orders: Order[];

    userName: string = localStorage.getItem('currentUser');
    user: string = "test";

    isReviewPanelActive: Map<string, boolean> = new Map<string, boolean>();
    reviewContent: Map<string, string> = new Map<string, string>();

    format = formatDate;

    constructor(private orderService: OrderService,
                private reviewService: ReviewService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getOrder();
    }

    getOrder() {
        this.orderService.getOrder(this.userName)
            .subscribe(
                order => {
                    this.orders = order;
                    for (let i = 0; i < this.orders.length; i++) {
                        this.reviewContent.set(this.orders[i]._id, '');
                    }
                },
                error => this.errorMessage = <any>error);
    }

    onSubmit(order: Order) {
        const newReview = new Review();
        newReview.order = order;
        newReview.content = order.reviewContent;
        newReview.rating = order.reviewRating; // replace with the user input
        this.reviewService.postReview(newReview)
            .subscribe(
                newReviewId => {
                    console.log(`Saved a review with id=${newReviewId}`)
                },
                error => this.errorMessage = <any>error
            );
        this.isReviewPanelActive.set(order._id, false);
    }

}