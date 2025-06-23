const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const passport = require("./config/authStrategy");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;
const communityData = require("./data/communityData");

app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/api/people", dataRoutes);
app.use("/", authRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: { message: "This route points to the Home page" },
  });
});
app.get("/api/people", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will send all of the people data" },
  });
});
app.get("/api/people/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will send a single person by their ID" },
  });
});
app.get("/api/people/create/new", (req, res, next) => {
  res.status(201).json({
    success: { message: "This will create a new person" },
  });
});
app.get("/api/people/update/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will update a person by their ID" },
  });
});
app.get("/api/people/delete/:id", (req, res, next) => {
  res.status(200).json({
    success: { message: "This will delete a person by their ID" },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
