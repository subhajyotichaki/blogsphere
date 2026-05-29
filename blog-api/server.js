const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");


dotenv.config();


connectDB();


const app = express();


// CORS CONFIG
const corsOptions = {

  origin: function (origin, callback) {

    if (
      !origin ||
      origin.includes("localhost") ||
      origin.endsWith(".vercel.app")
    ) {

      callback(null, true);

    } else {

      callback(new Error("Not allowed by CORS"));

    }

  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,

};


app.use(cors(corsOptions));


// Middleware
app.use(express.json());


// Routes
app.use("/api/blogs", require("./routes/blogRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));


// Test Route
app.get("/", (req, res) => {

  res.send("Blog API Running");

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});