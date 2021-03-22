import path from 'path';

import bodyParser from 'body-parser';
import config from 'config';
import express, {NextFunction as Next, Request, Response} from 'express';
import morgan from 'morgan';
import nextjs from 'next';

import render from 'middlewares/render';
import routes from 'routes';
import 'isomorphic-fetch';


const app = express();

const nextApp = nextjs({dev: process.env.NODE_ENV !== 'production'});

const publicDir = path.join(__dirname, 'public');

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use((err: Error, _req: Request, _res: Response, next: Next) => {
    console.error(err.stack);

    next();
});

app.use(render(nextApp));

routes(app);

app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

nextApp.prepare().then(() => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
