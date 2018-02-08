import { Request, Response, Router } from 'express';
import { Movie } from './movieSchema';
import { Cinema } from '../cinema/cinemaSchema';

const movieRouter: Router = Router({mergeParams: true});

movieRouter.get('/', (req: Request, res: Response) => {
    const filterMoviesByTitle = (movies: [{ title: string }]) => {
        return movies.filter(movie => req.query.title ? movie.title === req.query.title : true)
    };
    let query: any = {};
    if (req.query.cinema) {
        query['name'] = req.query.cinema;
        Cinema.findOne(query, (err, cinema: { movie: [any] }) => {
            if (err || !cinema) {
                res.status(404).send({message: `The cinema with the name=${req.query.cinema} wasn't found`});
                return;
            } else {
                res.send(filterMoviesByTitle(cinema.movie));
            }
        });
    } else {
        Movie.find((err, movies: [{ title: string }]) => {
            if (err || !movies) {
                res.status(404).send({message: `Failed to query movies`});
                return;
            } else {
                res.send(filterMoviesByTitle(movies));
            }
        })
    }

});

movieRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title;
    const duration = req.body.duration;
    const genre = req.body.genre;
    if (!title || !duration || !genre) {
        res.status(400).send({message: 'The body must contain: {title, duration, genre}'});
        return;
    }
    const newMovie = new Movie({
        title: title,
        duration: duration,
        genre: genre
    });
    newMovie.save((err, movie) => {
        if (err || !movie) {
            res.status(400).send({message: 'The body must contain: {title, duration, genre}'});
        } else {
            res.status(201).send(movie._id);
        }
    });
});

movieRouter.put('/:id', (req: Request, res: Response) => {
    const _id = req.params.id;
    if (!_id) {
        res.status(400).send({message: 'Only PUT /movie/:id is supported'});
        return;
    }
    const title = req.body.title;
    const duration = req.body.duration;
    const genre = req.body.genre;
    if (!title || !duration || !genre) {
        res.status(400).send({message: 'The body must contain: {title, duration, genre}'});
        return;
    }
    Movie.findOneAndUpdate(
        {
            _id: _id
        },
        {
            title: title,
            duration: duration,
            genre: genre
        },
        (err, movie) => {
            if (err || !movie) {
                res.status(404).send({message: 'Failed to find the movie'});
            } else {
                res.send();
            }
        }
    );
});

movieRouter.delete('/:id', (req: Request, res: Response) => {
    const _id = req.params.id;
    Movie.findByIdAndRemove(_id, (err, movie) => {
        if (err || !movie) {
            res.status(404).send({message: 'Failed to find the movie'});
        } else {
            res.send();
        }
    });
});

export { movieRouter };