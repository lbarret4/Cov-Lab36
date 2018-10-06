import { Router } from 'express';
import Table from '../table';
let router = Router();

let authors = new Table('authors');

router.get('/', async (req, res) => {
    try {
        let results = await authors.getAll();
        results = await results.map((result)=>{
            delete result.password;
            delete result.hash;
            return result;
        });
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await authors.getOne(id);
        delete results.password;
        delete results.hash;
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let authorObj = req.body;
    try {

        let results = await authors.update(id, authorObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await authors.delete(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});






export default router;