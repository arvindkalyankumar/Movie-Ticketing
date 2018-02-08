import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    duration: Number,
    genre: String,
});

const Movie = mongoose.model('Movie', movieSchema);
export { Movie, movieSchema }