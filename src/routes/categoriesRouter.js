import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const categoreiesRouter = Router();

categoreiesRouter.get("/categories", getCategories);

export default categoreiesRouter;
