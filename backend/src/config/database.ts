import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Database;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'notes_db',
      username: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
      port: Number(process.env.DB_PORT) || 1433,
      logging: false,
      dialectOptions: {
        authentication: {
          type: 'default',
          options: {
            userName: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
          }
        },
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const dbInstance = Database.getInstance().sequelize;
