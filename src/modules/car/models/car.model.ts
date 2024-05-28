import {
  Model,
  DataType,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CategoryModel } from 'src/modules/category/model/category.model';

@Table({ tableName: 'cars' })
export class CarModel extends Model<CarModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  registration_no: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @ForeignKey(() => CategoryModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  category_id: string;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;
}
