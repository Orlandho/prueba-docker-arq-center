import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';
import { User } from './User';

export class Note extends Model {
  declare id: number;
  declare title: string;
  declare file_path: string;
  declare owner_id: number;
  declare is_active: boolean;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: dbInstance,
    tableName: 'notes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Note.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.hasMany(Note, { foreignKey: 'owner_id', as: 'owned_notes' });
