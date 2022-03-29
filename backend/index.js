const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config({ path: "./.env" });
const connectDB = require("./config/db");
const questionRoute = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const subjectRoute = require('./routes/subjectRoutes')

const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

/**
 * Entry point api path for subject api
 */
 app.use('/subject', subjectRoute);

/**
 * Entry point api path for question api
 */
app.use('/question', questionRoute);

/**
 * Entry point api for user auth api
 */
app.use('/user', userRoutes);

app.use('/auth',authRoutes)


app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});
