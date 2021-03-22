import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AllowNull,
    ForeignKey, HasMany
} from 'sequelize-typescript';
import {HashTag} from "./hashTag";

@Table
export class Adventure extends Model<Adventure> {
    @PrimaryKey
    @ForeignKey(() => HashTag)
    @Column(DataType.INTEGER)
    id: number;

    @HasMany(() => HashTag)
    hashTags: HashTag[];

    @AllowNull(false)
    @Column(DataType.STRING)
    ruName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    enName: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    firstSceneId: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @AllowNull(true)
    @Column(DataType.STRING(1000))
    description: string;

}
