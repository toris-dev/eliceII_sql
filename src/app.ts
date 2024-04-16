import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { router } from './controller';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
const server = app.listen(8080, () => {
  console.log('Server Running✔️');
});
export default server;
