import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
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

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Oh-oh! Seems like the page you requested does not exist. Please check the URL again.',
  });
});

// Error handler
// no stack traces leaked to user in production
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    },
  });
});
app.listen(process.env.PORT || 3000);

export default app;
