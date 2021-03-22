import { Adventure } from './models/adventure';
import { Action } from './models/action';
import { Achievement } from './models/achievement';
import { HashTag } from './models/hashTag';
import {Op} from "sequelize";
import { Scene } from './models/scene';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';

import adventures from 'mocks/adventures.json';
import actions from 'mocks/actions.json';
import achievements from 'mocks/achievements.json';
import hashTags from 'mocks/hashTags.json';
import scene from 'mocks/scene.json';

export default class Database {
    private readonly _sequelize: Sequelize;

    constructor() {
        const sequelizeOptions: SequelizeOptions = {
            host: 'drona.db.elephantsql.com',
            port: 5432,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: 'mhkqapjw',
            dialect: 'postgres',
            ssl: true
        };

        this._sequelize = new Sequelize(sequelizeOptions);
        this._sequelize.addModels([
            Adventure,
            Action,
            Scene,
            HashTag,
            Achievement
        ]);
    }

    public async init(): Promise<void> {
        await this._sequelize.sync({ force: true}).then(() => {
            Adventure.bulkCreate(adventures);
            Scene.bulkCreate(scene);
            Action.bulkCreate(actions);
            HashTag.bulkCreate(hashTags);
            Achievement.bulkCreate(achievements);
        });
    }

    public async getAdventures(offsetAdv: number): Promise<Adventure[]> {
        return Adventure.findAll({
            where: {
                firstSceneId : { [Op.ne]: null }
            },
            attributes: ['firstSceneId', 'image', 'description', 'ruName', 'enName'],
            limit: 5,
            offset: offsetAdv,
            include: [
                {
                    model: HashTag,
                    attributes: ['ruName', 'enName']
                }
            ]
        });
    }

    public async getTagInfo(tag: string): Promise<HashTag[]> {
        return HashTag.findAll({
            where: {
                enName : { [Op.eq]: tag }
            },
            attributes: ['adventureId', 'ruName']
        });
    }

    public async getRuNameTag(tag: string): Promise<string|undefined> {
        const tagInfo = await this.getTagInfo(tag);
        return tagInfo.map(el => el.get('ruName'))[0];
    }

    public async getAdventuresByTag(tag: string, offsetAdv: number): Promise<Adventure[]> {
        const tagInfo = await this.getTagInfo(tag);

        const adventuresId = tagInfo.map(el => el.get('adventureId'));

        return Adventure.findAll({
            where: {
                firstSceneId : { [Op.ne]: null },
                id: { [Op.in]: adventuresId }
            },
            attributes: ['firstSceneId', 'image', 'description', 'ruName', 'enName'],
            limit: 5,
            offset: offsetAdv,
            include: [
                {
                    model: HashTag,
                    attributes: ['ruName', 'enName']
                }
            ]
        });

    }

    public async getFistSceneOfAdventure(adventureName: string): Promise<number|undefined> {
        const adventure =  await Adventure.findOne({
            where: {
                enName: {[Op.eq]: adventureName}
            },
            attributes: ['firstSceneId']
        });

        if (adventure) {
            return adventure.firstSceneId
        }

        return;
    }

    public async getScene(currentScene: string, adventureName: string): Promise<Scene|null> {
        return Scene.findOne({
            where: {
                id: { [Op.eq]: currentScene },
                adventureName: { [Op.eq]: adventureName }
            },
            include: [
                {
                    model: Achievement
                }
            ]
        });
    }

    public async getActions(sceneId: number): Promise<Action[]> {
        return Action.findAll({
            where : {
                sceneId: { [Op.eq]: sceneId }
            },
            attributes: ['name', 'nextSceneId']
        });
    }
}
