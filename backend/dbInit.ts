import { User } from './authentication/userSchema';
import { Movie } from './movie/movieSchema';
import { Cinema } from './cinema/cinemaSchema';
import { Order } from './order/orderSchema';
import { Review } from './review/reviewSchema';

export const fillDbWithTestData = () => {
    User.remove({}, (err: any) => {});
    Movie.remove({}, (err: any) => {});
    Cinema.remove({}, (err: any) => {});
    Order.remove({}, (err:any) => {});
    Review.remove({}, (err: any) => {});

    const user1 = new User({username: 'test', password: 'test', firstName: 'John', lastName: 'Doe'});
    user1.save();
    const user2 = new User({username: 'temp', password: 'temp', firstName: 'Bruce', lastName: 'Wayne'});
    user2.save();
    const user3 = new User({username: 'dummy', password: 'dummy', firstName: 'Jason', lastName: 'Bourne'});
    user3.save();
    const user4 = new User({username: 'ivan', password: 'ivan', firstName: 'Donald', lastName: 'Trump'});
    user4.save();

    const movie1 = new Movie({title: 'Dark Knight', duration: '150',genre: 'Action'});
    movie1.save();
    const movie2 = new Movie({title: 'Star Wars', duration: '120',genre: 'Sci-Fi'});
    movie2.save();
    const movie3 = new Movie({title: 'Deadpool', duration: '130',genre: 'Action'});
    movie3.save();
    const movie4 = new Movie({title: 'Justice League', duration: '140',genre: 'Animation'});
    movie4.save();
    const movie5 = new Movie({title: 'Goal', duration: '130',genre: 'Drama'});
    movie5.save();
    const movie6 = new Movie({title: 'Saw', duration: '150', genre: 'Horror'});
    movie6.save();

    const cinema2 = new Cinema({name: 'IX', location: 'Munich', rating: '4', movie: [movie1, movie2]});
    cinema2.save();
    const cinema3 = new Cinema({name: 'NOX', location: 'Berlin', rating: '2', movie: [movie4, movie5]});
    cinema3.save();
    const cinema4 = new Cinema({name: 'IOX', location: 'Hamburg', rating: '3', movie: [movie5, movie4]});
    cinema4.save();
    const cinema5 = new Cinema({name: 'Pix1', location: 'Dortmund', rating: '5', movie: [movie1, movie2, movie3, movie5]});
    cinema5.save();
    const cinema6 = new Cinema({name: 'Pix2', location: 'Berlin', rating: '2', movie: [movie1, movie2, movie3, movie5]});
    cinema6.save();
    const cinema7 = new Cinema({name: 'Pix3', location: 'Munich', rating: '4', movie: [movie1, movie2, movie3, movie4, movie5]});
    cinema7.save();

    const order1 = new Order({ticketCount:5, orderDate: '2017-07-04',user:user1, cinema: cinema2._id, movie: movie1._id});
    order1.save();
    const order2 = new Order({ticketCount:3, orderDate: '2017-07-11',user:user1, cinema: cinema3._id, movie: movie2._id});
    order2.save();
    const order3 = new Order({ticketCount:4, orderDate: '2017-05-12',user:user1, cinema: cinema4._id, movie: movie3._id});
    order3.save();
    const order4 = new Order({ticketCount:1, orderDate: '2017-06-09',user:user1, cinema: cinema5._id, movie: movie4._id});
    order4.save();
    const order5 = new Order({ticketCount:7, orderDate: '2017-03-08',user:user1, cinema: cinema6._id, movie: movie5._id});
    order5.save();
    const order6 = new Order({ticketCount:3, orderDate: '2017-06-27',user:user1, cinema: cinema7._id, movie: movie4._id});
    order6.save();
    const order7 = new Order({ticketCount:2, orderDate: '2017-07-19',user:user1, cinema: cinema4._id, movie: movie3._id});
    order7.save();
    const order8 = new Order({ticketCount:1, orderDate: '2017-05-18',user:user1, cinema: cinema5._id, movie: movie5._id});
    order8.save();
    const order9 = new Order({ticketCount:3, orderDate: '2017-04-24',user:user1, cinema: cinema6._id, movie: movie1._id});
    order9.save();
    const order10 = new Order({ticketCount:4, orderDate: '2017-06-03',user:user1, cinema: cinema3._id, movie: movie2._id});
    order10.save();

    const review1 = new Review({user: user1._id, cinema: cinema2._id, content: "Loved los pollos hermanos!", rating: 5, date: '02-02-2017'});
    review1.save();
    const review2 = new Review({user: user2._id, cinema: cinema2._id, content: "Hated los pollos hermanos!", rating: 1, date: '03-02-2017'});
    review2.save();
    const review3 = new Review({user: user1._id, cinema: cinema4._id, content: "I got a russian smile", rating: 3, data: '04-02-2017'});
    review3.save();

    console.info('Filled the database with test data');

};
