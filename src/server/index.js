import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import v1Route from './routes/v1';
import swaggerDoc from './swagger.json';

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes handler
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', v1Route);

app.use(express.static(path.join(__dirname, '../../dist/client')));
// catch un-available routes
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/client', 'index.html'));
});

app.listen(process.env.PORT || 3000);

export default app;
