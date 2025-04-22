//library imports
import express from 'express'
const cookieParser = require('cookie-parser')
const cors = require('cors')
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();



//controller imports
import {authRouter} from './routes/auth.routes';
import {notesRouter} from './routes/notes.routes';



//Select PORT number
const PORT = process.env.PORT || 8000



//middlewares
app.use(express.json());
app.use(cors({origin: ["https://todo-sz.onrender.com/"],credentials: true}));
app.use(cookieParser());



//routes
app.use('/notes',notesRouter)
app.use('/auth',authRouter);



//start the app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
