import express from 'express';
import cors from 'cors';
import { myRouter } from './routers/myRouter.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.static('public'));
app.use(express.json());

app.use('/', myRouter);

app.listen(3001, 'localhost', () => {
  console.log('Server is listening on http://localhost:3001');
});
