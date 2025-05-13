const express = require("express");
const { register, login } = require("../controllers/authController"); // Import controller

const router = express.Router();

// Route đăng ký
router.post("/register", register);
router.post('/login', login);

module.exports = router;
