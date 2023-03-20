import express from "express";
import { Auth, localVariables } from "../middleware/Auth.js";
import store from "../middleware/multer.js";

import {
  loginUser,
  signUpUser,
  confirmEmail,
  authenticate,
  getAllUsers,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  updateUser,
  resetPassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.use(localVariables);

// login router
router.post("/login", loginUser);

// signup router
router.post("/signup", store.single("picture"), signUpUser);

// send confirm email
router.post("/confirmEmail", confirmEmail);

// Authenticate Users
router.post("/authenticate", authenticate);

// Get All Users
router.get("/getAllUsers", getAllUsers);

// Get uSers
router.get("/:userName", getUser);

//Generate OTP
router.post("/generateOTP", Auth, localVariables, generateOTP);

// Verify OTP
router.post("/verifyOTP", Auth, verifyOTP);

// Create Reset session
router.get("/resetSession", createResetSession);

// Update Users
router.put("/updateUser", Auth, store.single("picture"), updateUser);

// Reset Password
router.post("/resetPassword", Auth, resetPassword);

export default router;
