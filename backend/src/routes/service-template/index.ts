import * as express from 'express';

const router = express.Router();

import { mwFetch, mwSave, mwDelete, mwHistory } from './middleware';

router.get('/fetch', [mwFetch], function (req, res, next) {
    res.send(req.resp);
});

router.get('/history', [mwHistory], function (req, res, next) {
    res.send(req.resp);
});

router.post('/save', [mwSave], function (req, res, next) {
    res.send(req.resp);
});

router.delete('/delete', [mwDelete], function (req, res, next) {
    res.send(req.resp);
});

export { router as rService };
