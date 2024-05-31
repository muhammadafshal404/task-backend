import { Model, DataType, Column, Table, HasMany } from 'sequelize-typescript';
import { CarModel } from 'src/modules/car/models/car.model';

@Table({ tableName: 'categories' })
export class CategoryModel extends Model<CategoryModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    unique: true,
  })
  name: string;

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

  @HasMany(() => CarModel)
  cars: CarModel[];
}
