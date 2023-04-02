import express from "express";
import { Auth } from "../middleware/Auth.js";
import store from "../middleware/multer.js";
import {
  getAllPosts,
  createPosts,
  getUserPosts,
  getPostById,
  updatePosts,
  deletePost,
} from "../controllers/postsControllers.js";

const router = express.Router();

router.post("/getAllPosts", getAllPosts);
router.post("/createPosts", Auth, store.single("file"), createPosts);
router.post("/getUserPosts/:userId", Auth, getUserPosts);
router.get("/getPostById/:id", Auth, getPostById);
router.put("/updatePosts/:id", Auth, store.single("pictures"), updatePosts);
router.delete("/deletePost/:id", Auth, deletePost);

export default router;
