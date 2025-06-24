require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const passport = require("./config/authStrategy");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");
const communityHelperRoutes = require("./routes/communityHelperRoutes");

// ✅ Initialize app BEFORE using app.use()
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// ✅ Routes
app.use("/api/people", dataRoutes);
app.use("/api", authRoutes);
app.use("/api/community-helpers", communityHelperRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: { message: "This route points to the Home page" },
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
