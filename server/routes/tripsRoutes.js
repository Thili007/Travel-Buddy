import express from "express";

import { Auth } from "../middleware/Auth.js";
import store from "../middleware/multer.js";
import {
  getAllTrips,
  createTrip,
  updateTrip,
  deleteTrip,
  likeTrip,
  tripComment,
} from "../controllers/tripControllers.js";

const router = express.Router();

router.get("/getAllTrips", Auth, getAllTrips);
router.post("/createTrip", Auth, store.array("picture", 6), createTrip);
// router.get("/getTripById/:id", Auth, getTripsById);
router.put("/updateTrip/:id", Auth, updateTrip);
router.delete("/deleteTrip", Auth, deleteTrip);
router.patch("/:id/likeTrip", Auth, likeTrip);
router.post("/:id/tripComment", Auth, tripComment);

export default router;
