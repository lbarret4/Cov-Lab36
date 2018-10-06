import { Router } from 'express';
import passport from 'passport';
import Table from '../table';
import { generateHash } from "../utils/security";
let router = Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});

router.post('/create', async (req, res) => {
    let authors = new Table('authors');
    let authorObj = req.body;
    let password = authorObj.password;
    let hash = await generateHash(password);
    authorObj.hash = await hash;
    try {
        let results = await authors.insert(authorObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;