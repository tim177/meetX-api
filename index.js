const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/auth", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
