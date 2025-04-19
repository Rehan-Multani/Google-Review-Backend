import { Router } from "express";

import AuthRouter from "./Routers/AuthRouter.js";
import PlanRouter from "./Routers/PlanRouter.js";
import CreateQRCodeRouter from "./Routers/CreateQRCodeRouter.js";
import createEnquiry from "./Routers/enquiryRouter.js";
import createBanner from "./Routers/bannerRouter.js";
import createCompany from "./Routers/companyRouter.js";
import googleRouter from "./Routers/googleRouter.js";
import reviewRouter from "./Routers/reviewRouter.js";
import reviewCustomRouter from "./Routers/reviewCustomRouter.js";


const router = Router();

router.use("/api", AuthRouter);
router.use("/api", PlanRouter);
router.use("/api", CreateQRCodeRouter);
router.use("/api", createEnquiry);
router.use("/api", createBanner);
router.use("/api", createCompany);
router.use("/api", googleRouter);
router.use("/api", reviewRouter);
router.use("/api", reviewCustomRouter);


export default router;
