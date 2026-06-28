import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';

export class PermissionLevel extends Model {
  declare id: number;
  declare name: string;
  declare is_active: boolean;
}

PermissionLevel.init(
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
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: dbInstance,
    tableName: 'permission_levels',
    timestamps: false,
  }
);
