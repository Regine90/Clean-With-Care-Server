const express = require("express");
const passport = require("passport");
const { register, login, logout } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);

// Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
