import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { mongoConnect } from './services/db.js';
// const usersRouter = require('./routes/tasks.js');
import locationsRouter from './routes/locations.routes.js';
import loginRouter from './routes/login.routes.js';
import userRouter from './routes/user.routes.js';
import { userCreator } from './models/user.model.js';
import { locationCreator } from './models/location.model.js';

dotenv.config();
export const app = express();
const port = process.env.PORT;

mongoConnect();
export const User = userCreator();
export const Location = locationCreator();

// Se llama a express, morgan y cors. Cors es necesario para evitar un mensaje de error en el frontend.
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Se llama a los routers
app.use('/locations', locationsRouter);
app.use('/login', loginRouter);
app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, resp, next) => {
    resp.status(err.status);
    resp.json({ error: err.message });
});

export const server = app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}`);
});
