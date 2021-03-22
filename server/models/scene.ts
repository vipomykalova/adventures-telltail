import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AllowNull,
    ForeignKey,
    HasMany
} from 'sequelize-typescript';
import {Achievement} from "./achievement";
import {Action} from "./action";

@Table
export class Scene extends Model<Scene> {
    @PrimaryKey
    @ForeignKey(() => Achievement)
    @ForeignKey(() => Action)
    @Column(DataType.INTEGER)
    id: number;

    @HasMany(() => Achievement)
    achievements: Achievement[];

    @HasMany(() => Action)
    actions: Action[];

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @AllowNull(true)
    @Column(DataType.STRING(1000))
    description: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    adventureName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    descPosition: string;

}
