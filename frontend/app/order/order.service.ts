import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Order } from './order';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class OrderService extends AbstractService {

    private orderUrl = '/order';  // URL to web API

    constructor(private http: Http) {
        super()
    }

    getOrder(user: string): Observable<Order[]> {
        let url = `${this.backendUrl.concat(this.orderUrl)}?`
            .concat([
                user ? `user=${user}` : ''
            ].join('&'));
        return this.http.get(url,this.getRequestOptions())
            .map(this.extractData)
            .catch(this.handleError);
    }
}