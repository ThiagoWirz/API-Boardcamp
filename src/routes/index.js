import { Router } from "express";
import caregoreiesRouter from "./categoriesRouter.js";

const router = Router();

router.use(caregoreiesRouter);

export default router;
