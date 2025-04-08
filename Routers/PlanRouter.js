import express from "express";

import PlanController from "../Controllers/PlanCtrl.js";
import { authMiddleware } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/plan", authMiddleware, PlanController.getallPlan);
router.post("/plan", authMiddleware, PlanController.createPlan);
router.put("/plan/:id", authMiddleware, PlanController.editPlan);
router.put("/plan/:id", authMiddleware, PlanController.editPlan);
router.delete("/plan/:id", authMiddleware, PlanController.deletePlan);

export default router;
