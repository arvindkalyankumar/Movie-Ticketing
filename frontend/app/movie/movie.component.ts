import { OnInit, Component} from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { CinemaService } from '../cinema/cinema.service';

@Component ({
    selector: 'movies',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css'],
    providers: [MovieService, CinemaService]
})

export class MovieComponent implements OnInit {

    errorMessage: string;
    movies: Movie[];

    title: string;
    cinema: string;

    constructor (private movieService: MovieService,
                 private cinemaService: CinemaService) {
    }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies() {
        this.movieService.getMovies(this.title, this.cinema)
            .subscribe(movies => {
                    this.movies = movies;
                    for (let i = 0; i < this.movies.length; i++) {
                        const movie = this.movies[i];
                        this.cinemaService.getCinemas(null, movie.title)
                            .subscribe(cinemas => {
                                movie.cinemas = cinemas;
                                console.log('cinemas', movie.title, cinemas);
                            })
                    }
                },
                error =>  this.errorMessage = <any>error);
    }
}