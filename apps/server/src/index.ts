import dotenv from 'dotenv';
import { createServer } from './server';
dotenv.config();

const PORT = 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
