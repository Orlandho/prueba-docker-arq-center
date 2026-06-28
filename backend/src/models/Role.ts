import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';

export class Role extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public is_active!: boolean;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: dbInstance,
    tableName: 'roles',
    timestamps: false,
  }
);
