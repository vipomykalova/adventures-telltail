import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AllowNull,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Scene } from './scene';

@Table
export class Action extends Model<Action> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @ForeignKey(() => Scene)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    sceneId: number;

    @BelongsTo(() => Scene)
    scene: Scene;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    nextSceneId: number;

}
