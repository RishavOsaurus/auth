import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import mongoose from 'mongoose';
import { printReq } from "./middleware/middleware.js";
import  cors from "cors"
import  authRoutes from "./routes/routes.js"

const CLIENT_URL = "http://127.0.0.1:5500";
const app = express();

app.use(printReq)

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));




app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax'
    }
  })
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))




try{
await mongoose.connect(process.env.MONGO_URL)
console.log("Connected to MongoDB")
}catch(err){
    console.log(`DB Conn Error: ${err}`)
}

app.use('/api/auth',authRoutes)
export default app;
