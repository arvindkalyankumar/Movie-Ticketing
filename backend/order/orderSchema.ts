import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    ticketCount: Number,
    orderDate: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cinema: {type: mongoose.Schema.Types.ObjectId, ref: 'Cinema'},
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}
});

export const Order = mongoose.model('Order', orderSchema);