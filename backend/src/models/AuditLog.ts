import { Model, DataTypes } from 'sequelize';
import { dbInstance } from '../config/database';

export class AuditLog extends Model {
  public id!: number;
  public action!: string;
  public entity!: string;
  public entity_id!: number;
  public user_id!: number;
  public details!: string;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    details: {
      type: DataTypes.STRING(1000), // JSON stringified details
      allowNull: true,
    },
  },
  {
    sequelize: dbInstance,
    tableName: 'audit_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false, // Audit log should never be updated
  }
);
