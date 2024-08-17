import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send('Api is Working');
});

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI || 'mongodb+srv://amityadav98255:hHG3wZTmOtV9wy6S@cluster0.qkf2imk.mongodb.net/bookstore?retryWrites=true&w=majority';

// connect to mongoDB
mongoose.connect(URI, {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);    

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});