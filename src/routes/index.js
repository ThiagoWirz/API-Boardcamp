import { Router } from "express";
import categoreiesRouter from "./categoriesRouter.js";

const router = Router();

router.use(categoreiesRouter);

export default router;
