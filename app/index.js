import 'dotenv/config';
import express from 'express';
import mainRouter from './routers/main.js';
import errorHandler from './errorHandler.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler.notFound);
app.use(errorHandler.internalServerError);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});