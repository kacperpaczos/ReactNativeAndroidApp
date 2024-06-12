import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'password', type: 'string' }
      ]
    }),
    tableSchema({
      name: 'settings',
      columns: [
        { name: 'theme', type: 'string' },
        { name: 'notifications_enabled', type: 'boolean' }
      ]
    })
  ]
});