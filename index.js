import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

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

const PORT = process.env.PORT || 4002;
const URI = process.env.MongoDBURI;

console.log("MongoDB URI:", URI);

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
