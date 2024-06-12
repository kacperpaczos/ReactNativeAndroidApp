import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema/schema';
import User from './models/User';
import Settings from './models/Settings';

const adapter = new SQLiteAdapter({
  dbName: 'MyAppDB',
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Settings],
});