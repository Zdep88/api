import 'dotenv/config';
import express from 'express';
import router from './router.js';
import errorHandler from './errorHandler.js';

const app = express();
const port = process.env.PORT;

app.use(router);
app.use(errorHandler.notFound);
app.use(errorHandler.internalServerError);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});