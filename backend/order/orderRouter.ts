import { Request, Response, Router } from 'express';
import { passport } from '../authentication/authenticator';
import { Order } from './orderSchema';

const orderRouter: Router = Router({mergeParams: true});

orderRouter.use(passport.authenticate('jwt', {session: false}));

orderRouter.get('/', (req: Request, res: Response) => {
    Order.find({user: req.user}).populate('movie').populate('cinema').exec((err: any, order: [any]) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(order);
        }
    });
});

orderRouter.post('/', (req: Request, res: Response) => {
    new Order({
        ticketCount: req.body.ticketCount,
        orderDate: req.body.orderDate,
        user: req.user,
        movie: req.body.movie,
        cinema: req.body.cinema
    }).save((err, order) => {
        if (err || !order) {
            res.status(404).send(err);
        } else {
            res.status(201).send({_id: order._id.toString()});
        }
    });
});

export { orderRouter }
