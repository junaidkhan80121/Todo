//library imports
const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();


//controller imports
const authController = require('./routes/auth.routes');
const noteController = require('./routes/notes.routes')
const isLoggedIn = require('./middlewares/auth.middleware')

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
app.use('/notes',isLoggedIn ,noteController)
app.use('/auth',authController);


// error route
app.use((err,req,res,next)=>{
  if(err)
    return res.status(500).send({msg:"Internal error. Please try after sometime."})
  next()
})


//start the app
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
