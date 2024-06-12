import { database } from '../database';

export class SettingsDAO {
  async updateSettings(theme, notificationsEnabled) {
    return await database.action(async () => {
      const settingsCollection = database.collections.get('settings');
      const settings = await settingsCollection.query().fetch();

      if (settings.length > 0) {
        const currentSettings = settings[0];
        await currentSettings.update((setting) => {
          setting.theme = theme;
          setting.notificationsEnabled = notificationsEnabled;
        });
      } else {
        await settingsCollection.create((setting) => {
          setting.theme = theme;
          setting.notificationsEnabled = notificationsEnabled;
        });
      }
    });
  }

  async getSettings() {
    return await database.collections.get('settings').query().fetch();
  }
}