import {Adventure} from './models/adventure';
import {Scene} from './models/scene';
import {Action} from './models/action';

export interface PageData {
    adventures?: Adventure[];
    hashTag?: string;
}

export interface SceneData {
    scene: Scene;
    actions: Action[];
    adventureName: string;

    firstScene?: number;
}
