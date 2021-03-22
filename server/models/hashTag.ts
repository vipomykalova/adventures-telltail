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
import {Adventure} from "./adventure";

@Table
export class HashTag extends Model<HashTag> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    ruName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    enName: string;

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;

    @BelongsTo(() => Adventure)
    adventures: Adventure[];
}
