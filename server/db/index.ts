import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import sequelize from './connection';

const basename = path.basename(__filename);
const db: any = {};

fs
  .readdirSync(path.join(__dirname, '/models'))
  .filter((file: string) => (
    file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts') && (file.slice(0, 4) !== 'Base'))
  .forEach((file: any) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(path.join(__dirname, '/models', file)).default;
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (db[modelName].baseAssociations) {
    db[modelName].baseAssociations(db, db[modelName]);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
