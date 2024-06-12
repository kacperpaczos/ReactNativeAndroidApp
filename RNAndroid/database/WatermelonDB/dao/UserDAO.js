import { database } from '../database';

export class UserDAO {
  async addUser(name, password) {
    return await database.action(async () => {
      const usersCollection = database.collections.get('users');
      return await usersCollection.create((user) => {
        user.name = name;
        user.password = password;
      });
    });
  }

  async getAllUsers() {
    return await database.collections.get('users').query().fetch();
  }

  async deleteUser(userId) {
    const user = await database.collections.get('users').find(userId);
    return await database.action(async () => {
      await user.destroyPermanently();
    });
  }
}