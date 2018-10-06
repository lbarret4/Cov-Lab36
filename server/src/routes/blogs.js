import { Router } from 'express';
import Table from '../table';
import blogTagsRouter from './blogtags';
let router = Router();

let blogs = new Table('blogs');
let authors = new Table('authors');

router.use('/blogtags', blogTagsRouter);

router.get('/', async (req, res) => {
    
    try {
        let results = await blogs.getAll();
        results = await Promise.all(results.map(async (result) => {
            let author = await authors.getOne(result.authorid);
            result.author = await author.name;
            return result;
        }));

        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await blogs.getOne(id);
        let author = await authors.getOne(result.authorid);
        result.author = await author.name;
        res.json(await result);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let blogObj = req.body;
    try {

        let results = await blogs.insert(blogObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let blogObj = req.body;
    try {

        let results = await blogs.update(id, blogObj);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let results = await blogs.delete(id);
        res.json(await results);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});







export default router;
