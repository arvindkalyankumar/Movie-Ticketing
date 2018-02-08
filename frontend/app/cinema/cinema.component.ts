import { OnInit, Component} from '@angular/core';
import { Cinema } from './cinema';
import { CinemaService } from './cinema.service';

@Component ({
    selector: 'cinemas',
    templateUrl: './cinema.component.html',
    styleUrls: ['./cinema.component.css'],
    providers: [CinemaService]
})

export class CinemaComponent implements OnInit {

    errorMessage: string;
    cinemas: Cinema[];

    location: string;
    movie: string;

    constructor (private cinemaService: CinemaService) {
    }

    ngOnInit(): void {
        this.getCinemas();
    }

    getCinemas() {
        this.cinemaService.getCinemas(this.location, this.movie)
            .subscribe(
                cinemas => {
                    this.cinemas = cinemas
                },
                error =>  this.errorMessage = <any>error);
    }

    getMovieNames(cinema: Cinema): string {
        return cinema.movie.map(movie => movie.title).join(', ');
    }

}