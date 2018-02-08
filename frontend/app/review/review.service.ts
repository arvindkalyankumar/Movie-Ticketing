import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Review } from './review';
import { AbstractService } from '../shared/abstract.service';
import { Cinema } from "../cinema/cinema";
import {ObjectID} from "bson";

@Injectable()
export class ReviewService extends AbstractService {

    private reviewUrl = '/review';  // URL to web API

    constructor(private http: Http) {
        super()
    }

    getReviews(cinemaId: string): Observable<Review[]> {
        let url = `${this.backendUrl.concat(this.reviewUrl)}?`
            .concat([
                cinemaId ? `cinema=${cinemaId}` : ''
            ].join('&'));
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postReview(review: Review): Observable<string> {
        let url = `${this.backendUrl.concat(this.reviewUrl)}`;
        return this.http.post(url, review, this.getRequestOptions())
            .map(this.extractData)
            .catch(this.handleError);
    }

}