import { Router } from 'express';
import { authenticate } from './authentication/authenticator';
import { cinemaRouter } from './cinema/cinemaRouter';
import { movieRouter } from './movie/movieRouter';
import { orderRouter } from './order/orderRouter';
import { reviewRouter } from './review/reviewRouter';

const router: Router = Router();

router.post('/authenticate', authenticate);
router.use('/cinema', cinemaRouter);
router.use('/movie', movieRouter);
router.use('/order', orderRouter);
router.use('/review', reviewRouter);

export { router };