import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { JwtFromRequestFunction, VerifiedCallback } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from './userSchema';

interface JwtOptions {
    jwtFromRequest: JwtFromRequestFunction;
    secretOrKey: string;
}

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions: JwtOptions = {jwtFromRequest: ExtractJwt.fromAuthHeader(), secretOrKey: 'secret'};

const strategy = new JwtStrategy(jwtOptions,
    (jwtPayload: { username: string }, next: VerifiedCallback) => {
        User.findOne({username: jwtPayload.username}, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                next(null, false);
            } else if (user) {
                next(null, user);
            }
        });
    });

passport.use(strategy);

const authenticate = (req: Request, res: Response) => {
    User.findOne({username: req.body.username},
        (err: any, user: { username: string, password: string }) => {
            if (err || !user) {
                res.status(401).json({message: 'No such user found'});
                return;
            } else if (user) {
                if (user.password === req.body.password) {
                    const payload = {username: user.username};
                    const token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.json({message: 'Success', token: `JWT ${token}`});
                } else {
                    res.status(401).json({message: 'Incorrect password'});
                }
            }
        });
};

export { passport, authenticate };
