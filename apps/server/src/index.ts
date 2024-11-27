import dotenv from 'dotenv';
import { createServer } from './server';
import express from 'express';
dotenv.config();

const server = createServer();
const prepend = express();
prepend.use('/api', server);

const port = parseInt(process.env.PORT || '8000');

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
