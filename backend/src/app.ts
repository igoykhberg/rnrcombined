import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as http from 'http';
import * as createError from 'http-errors';
import { randomUUID } from 'crypto';

import { normalizePort, onError } from './utils/app';

// routes
import { rService } from './routes/service-template';

declare global {
    namespace Express {
        interface Request {
            guid: string;
        }
    }
}

const app = express();
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim();
app.use((req, res, next) => {
    req.guid = randomUUID();
    next();
});

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/service', rService);

app.use('/', (req, res, next) =>
    res.status(403).send(JSON.stringify({ status: 403, guid: req.guid }))
);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    console.log('err.MESSAGE_LOG :', err.message);
    res.status(err.status || 503);
    res.json(err);
});

const port = normalizePort(process.env.PORT || '3922');
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => {
    console.info(`listening on port: ${port}`);
});
server.on('error', function (err) {
    onError(err, port);
});
