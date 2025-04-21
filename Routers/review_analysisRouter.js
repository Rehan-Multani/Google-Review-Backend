import express from "express";

import review_analysisController from "../Controllers/review_analysisCtrl.js";

const router = express.Router();

router.post("/review_analysis",  review_analysisController.createReviewAnalysis);
router.get("/review_analysis", review_analysisController.getAllReviewAnalysis);


export default router;