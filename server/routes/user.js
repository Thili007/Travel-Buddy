const express = require("express");
const { loginUser, signUpUser } = require("../controllers/userControllers");

const router = express.Router();

// login router

router.post("/login", loginUser);

// signup router

router.post("/signup", signUpUser);

module.exports = router;
