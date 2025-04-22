//library imports
import express from 'express'
const cookieParser = require('cookie-parser')
const cors = require('cors')
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();


//controller imports
import {authRouter} from './routes/auth.routes';
import {notesRouter} from './routes/notes.routes';
import {isLoggedIn} from './middlewares/auth.middleware';

//Select PORT number
const PORT = process.env.PORT || 8000


//middlewares
app.use(express.json());
app.use(cors({origin: ["http://localhost:3000",'http://localhost:5173'],credentials: true}));
app.use(cookieParser());


//database connectivity
mongoose
  .connect("mongodb://localhost:27017/notesapp")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error", err));


//routes
app.use('/notes',notesRouter)
app.use('/auth',authRouter);


//error route
// app.use((err:Error,_req:Request,res:Response,next:NextFunction)=>{
//   if(err)
//     return res.status(500).send({msg:"Internal error. Please try after sometime."})
//   next()
// })


//start the app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
