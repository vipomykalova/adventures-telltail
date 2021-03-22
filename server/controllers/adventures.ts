import {Request, Response} from 'express';
import {getDb} from '../routes';
import {Adventure} from "../models/adventure";

import {PageData, SceneData} from "types";


export async function fiveAdventures(_req: Request, res: Response): Promise<void> {
    const db = getDb();
    const adventures = await db.getAdventures(0);
    if (adventures.length) {
        const data: PageData = {
            adventures
        };
        res.json(data);
    } else {
        res.sendStatus(404);
    }

}

export async function nextFiveAdventures(req: Request, res: Response): Promise<void> {
    const offsetAdventure = Number(req.query.offset);
    const enNameTag = req.query.hashTag;
    let hashTag;
    const db = getDb();
    let adventures: Adventure[];
    if (enNameTag) {
        adventures = await db.getAdventuresByTag(enNameTag, offsetAdventure);
        hashTag = await db.getRuNameTag(enNameTag);
    }
    else {
        adventures = await db.getAdventures(offsetAdventure);
    }
    const data: PageData = {
        adventures,
        hashTag

    };
    res.json(data);
}

export async function adventuresByTag(req: Request, res: Response): Promise<void> {
    const enNameTag = req.query.hashTag;
    const db = getDb();
    const adventures = await db.getAdventuresByTag(enNameTag, 0);
    if (adventures.length) {
        const hashTag = await db.getRuNameTag(enNameTag);
        const data: PageData = {
            adventures,
            hashTag
        };
        res.json(data);
    } else {
        res.sendStatus(404);
    }
}

export async function scene(req: Request, res: Response): Promise<void> {
    const db = getDb();

    const adventureName = req.query.adventure;
    const currentScene = req.query.sceneId;

    const firstScene  = await db.getFistSceneOfAdventure(adventureName);
    const scene = await db.getScene(currentScene, adventureName);
    if (scene) {
        const actions = await db.getActions(scene.id);
        const data: SceneData = {
            scene,
            actions,
            adventureName,
            firstScene
        };
        res.json(data);
    } else {
        res.sendStatus(404);
    }

}
