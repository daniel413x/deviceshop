import fs from 'fs';
import path from 'path';
import db from '../db';
import ApiError from '../error/ApiError';

const approriateFiles = (file: string) => {
  if (file.indexOf('.') === 0 || file.slice(-3) !== '.ts' || file.slice(0, 4) === 'Base') {
    return false;
  }
  return true;
};

class TestingController {
  async reset(req, res, next) {
    if (process.env.NODE_ENV === 'test') {
      const models = fs
        .readdirSync(path.join(__dirname, '../db/models'))
        .filter(approriateFiles)
        .map((file: any) => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const model = require(path.join(__dirname, '../db/models', file)).default;
          return model;
        });
      for (let i = 0; i < models.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await models[i].destroy({ truncate: true, cascade: true });
      }
      const queryInterface = db.sequelize.getQueryInterface();
      const seeders = fs
        .readdirSync(path.join(__dirname, '../seeders_test'))
        .filter(approriateFiles)
        .map((file: any) => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const seeder = require(path.join(__dirname, '../seeders_test', file)).default;
          return seeder.up;
        });
      for (let i = 0; i < seeders.length; i += 1) {
        // seeder files must be called consecutively
        // eslint-disable-next-line no-await-in-loop
        await seeders[i](queryInterface);
      }
    } else {
      return next(new ApiError(403, 'Forbidden request'));
    }
    return res.status(204).end();
  }
}

export default new TestingController();
