import { Request, Response, Router } from 'express';
import { Cinema } from './cinemaSchema';
import { Review } from '../review/reviewSchema';

const cinemaRouter: Router = Router({mergeParams: true});

cinemaRouter.get('/', (req: Request, res: Response) => {
    let query: any = {};
    if (req.query.location) {
        query['location'] = req.query.location;
    }
    if (req.query.movie) {
        query['movie.title'] = req.query.movie;
    }
    Cinema.find(query, (err: any, cinemas: [any]) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(cinemas);
        }
    });
    Review.find(query);
});

export { cinemaRouter }