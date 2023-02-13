import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import db from './db';
import router from './routes/index';
import errorMiddleware from './middleware/errorMiddleware';
import requestLogger from './middleware/requestLogger';
import logger from './middleware/logger';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'client_dist')));
app.use(fileUpload({}));
app.use('/api/', router);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client_dist', 'index.html'));
});
app.use(errorMiddleware);

const init = async () => {
  try {
    await db.sequelize.authenticate();
    app.listen(PORT, () => logger(`server started on port ${PORT}`));
  } catch (e) {
    logger(e);
  }
};

init();
