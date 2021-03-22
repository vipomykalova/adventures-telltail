import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import {Scene} from "./scene";

@Table
export class Achievement extends Model<Achievement> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    image: string;

    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    sceneId: number;

    @BelongsTo(() => Scene)
    scene: Scene[];
}
