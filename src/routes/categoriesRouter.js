import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const caregoreiesRouter = Router();

caregoreiesRouter.get("/categories", getCategories);

export default caregoreiesRouter;
