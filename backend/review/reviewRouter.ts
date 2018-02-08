import { Request, Response, Router } from 'express';
import { passport } from '../authentication/authenticator';
import { Cinema } from '../cinema/cinemaSchema';
import { Review } from './reviewSchema';

const reviewRouter: Router = Router({mergeParams: true});

reviewRouter.get('/', (req: Request, res: Response) => {
    if (!req.query.cinema) {
        res.status(400).send({message: 'The cinema param is required'});
        return;
    }
    Cinema.findById(req.query.cinema, function (err, cinema) {
        if (err || !cinema) {
            res.status(404).send(err);
            return;
        }

        Review.find({cinema: cinema}).populate('user').exec((err: any, reviews: [any]) => {
            if (err || !reviews) {
                res.status(404).send(err);
            } else {
                res.send(reviews);
            }
        });
    });
});

reviewRouter.use(passport.authenticate('jwt', {session: false}));

reviewRouter.post('/', (req: Request, res: Response) => {
    const order = req.body.order;
    const content = req.body.content;
    const rating = req.body.rating;

    if (!order || !content || !rating) {
        res.status(400).send({message: 'The body must contain {order, content, rating}'});
        return;
    }

    const newReview = new Review({
        user: req.user._id,
        order: order._id,
        content: content,
        cinema: order.cinema._id,
        rating: rating,
        date: Date.now()
    });

    newReview.save((err, review) => {
        if (err || !review) {
            res.status(404).send(err);
        } else {
            res.status(201).send({_id: review._id.toString()});
        }
    });
});

export { reviewRouter }
