import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ADMIN, USER } from '../utils/consts';

const hashPassword = async () => {
  const hash = await bcrypt.hash('admintemppassword', 5);
  return hash;
};

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'admin@devicedeal.com',
      firstName: 'Daniel',
      lastName: 'Maramba',
      username: 'admin',
      password: await hashPassword(),
      avatar: 'admin.jpg',
      roles: [USER, ADMIN],
      id: uuid,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
