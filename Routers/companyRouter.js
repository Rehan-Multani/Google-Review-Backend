import express from "express";

import companyController from "../Controllers/companyCtrl.js";

const router = express.Router();

router.post("/company", companyController.createCompany);
router.get("/getallCompany", companyController.getallCompany);
router.get("/getCompanyById/:id", companyController.getCompanyById);
router.delete("/deleteCompany/:id", companyController.deleteCompany);
router.post("/updateCompanyStatus/:id", companyController.updateCompanyStatus);
router.put("/editCompany/:id", companyController.editCompany)
router.get("/getCompanyDetails", companyController.getCompanyDetails);
router.get("/getCompanyDetailsforSentimentAnalytics", companyController.getCompanyDetailsforSentimentAnalytics);



export default router;  