import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ColumnEntity, Task, User, Workspace } from './entities';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

const parsedDatabaseUrl = new URL(databaseUrl);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: parsedDatabaseUrl.hostname,
  port: Number(parsedDatabaseUrl.port || 5432),
  username: decodeURIComponent(parsedDatabaseUrl.username),
  password: decodeURIComponent(parsedDatabaseUrl.password || ''),
  database: parsedDatabaseUrl.pathname.replace(/^\//, ''),
  ssl: parsedDatabaseUrl.searchParams.get('sslmode') === 'require',
  entities: [User, Workspace, ColumnEntity, Task],
  synchronize: false,
};

export const typeOrmConfig: TypeOrmModuleOptions = dataSourceOptions;
