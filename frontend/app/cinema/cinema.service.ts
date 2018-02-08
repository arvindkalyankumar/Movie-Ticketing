import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cinema } from './cinema';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class CinemaService extends AbstractService {

    private cinemaUrl = '/cinema';  // URL to web API

    constructor(private http: Http) {
        super()
    }

    getCinemas(location: string, movie: string): Observable<Cinema[]> {
        let url = `${this.backendUrl.concat(this.cinemaUrl)}?`
            .concat([
                location ? `location=${encodeURIComponent(location)}` : ''
                , movie ? `movie=${encodeURIComponent(movie)}` : ''
            ].join('&'));
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

}