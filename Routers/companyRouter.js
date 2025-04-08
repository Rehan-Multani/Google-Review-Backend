import express from "express";

import companyController from "../Controllers/companyCtrl.js";
import { authMiddleware } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/company",  companyController.createCompany);
router.get("/getallCompany", companyController.getallCompany);
// router.post("/business", QRCodeontroller.createBusiness);
// router.put("/qr-code/:id", authMiddleware, QRCodeontroller.editQRCode);
// router.delete("/qr-code/:id", authMiddleware, QRCodeontroller.deleteQRCode);

export default router;  