import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';

export class Role extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare is_active: boolean;
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
