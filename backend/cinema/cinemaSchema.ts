import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import {movieSchema} from '../movie/movieSchema';

const cinemaSchema = new Schema({
    name: String,
    location: String,
    rating: Number,
    movie: [movieSchema]
});

export const Cinema = mongoose.model('Cinema', cinemaSchema);