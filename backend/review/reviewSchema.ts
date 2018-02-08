import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
    content: String,
    rating: Number,
    date: Date
});

export const Review = mongoose.model('Review', reviewSchema);