const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login/error", (req, res, next) => {
  return res.json("Login error");
});

router.get("/login/local", localLogin);
router.get("/logout", logout);

router.get("/unauthenticated", (req, res, next) => {
  console.log("Returning to the homepage...");
  res.redirect("/");
});

router.get("/auth/google", 
  passport.authenticate("google", {scope:["profile", "email"]})
);

router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login,"
  }),
  (req, res) => {
    res.redirect("/")
  });

module.exports = router;