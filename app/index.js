import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});