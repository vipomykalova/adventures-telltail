import {parse} from 'url';

import {Application} from 'express';

import {adventuresByTag, fiveAdventures, nextFiveAdventures, scene} from 'controllers/adventures';
import Database from './database';

const db = new Database();

export function getDb(): Database {
    return db;
}

export default (app: Application): void => {
    db.init().then(() => {
        app.get('/', (_req, res) => res.renderPage('/'));

        app.get('/:hashTag', (_req, res) => res.renderPage('/',
            {hashTag: _req.params.hashTag}));

        app.get('/games/:adventure/:sceneId([1-9]+)', (_req, res) => res.renderPage('/scene',
            {adventure: _req.params.adventure, sceneId: _req.params.sceneId}));

        // Создаем дополнительные маршруты для AJAX-запросов, которые будут отвечать в JSON формате
        app.get('/api/getAdventures', nextFiveAdventures);
        app.get('/api/fiveAdventures', fiveAdventures);
        app.get('/api/adventuresByTag', adventuresByTag);
        app.get('/api/scene', scene);

        app.all('*', (req, res) => {
            const handleRequest = req.nextApp.getRequestHandler();
            const parsedUrl = parse(req.url, true);

            return handleRequest(req, res, parsedUrl);
        });
    });

};
