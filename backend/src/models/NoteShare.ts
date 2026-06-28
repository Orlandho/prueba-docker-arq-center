import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';
import { Note } from './Note';
import { User } from './User';
import { PermissionLevel } from './PermissionLevel';

export class NoteShare extends Model {
  public note_id!: number;
  public shared_with_user_id!: number;
  public permission_level_id!: number;
  public is_active!: boolean;
}

NoteShare.init(
  {
    note_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    shared_with_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    permission_level_id: {
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
    tableName: 'note_shares',
    timestamps: false,
  }
);

Note.belongsToMany(User, { through: NoteShare, foreignKey: 'note_id', as: 'shared_users' });
User.belongsToMany(Note, { through: NoteShare, foreignKey: 'shared_with_user_id', as: 'shared_notes' });

NoteShare.belongsTo(PermissionLevel, { foreignKey: 'permission_level_id', as: 'permission' });
