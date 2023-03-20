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
router.post("/createPosts", Auth, store.array("picture", 12), createPosts);
router.get("/getPostById/:id", Auth, getPostById);
router.put("/updatePosts/:id", Auth, store.array("picture", 12), updatePosts);
router.delete("/deletePost/:id", Auth, deletePost);
router.delete("/getUserPosts/:userId/posts", Auth, getUserPosts);

export default router;
