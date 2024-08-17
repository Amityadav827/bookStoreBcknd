import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const bodyParser = require("body-parser");
const cors = require('cors');
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
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI); // No need for useNewUrlParser and useUnifiedTopology
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);    

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});