import express from "express";

import { getCityDetails } from "../controllers/cityDetailsControllers.js";

const router = express.Router();

router.post("/getAllCities", getCityDetails);

export default router;
