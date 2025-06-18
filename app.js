const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const userRoute = require("./routes/userRoute");

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);




app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
