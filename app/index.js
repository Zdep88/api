import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT;

console.log(`Server is starting on port ${port}`);