import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from './movie';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class MovieService extends AbstractService {

    private movieUrl = '/movie';  // URL to web API

    constructor(private http: Http) {
        super()
    }

    getMovies(title: string, cinema: string): Observable<Movie[]> {
        let url = `${this.backendUrl.concat(this.movieUrl)}?`
            .concat([
                title ? `title=${encodeURIComponent(title)}` : '',
                cinema ? `cinema=${encodeURIComponent(cinema)}` : ''
            ].join('&'));
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
}