import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

export const User = mongoose.model('User', userSchema);