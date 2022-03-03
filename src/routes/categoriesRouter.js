import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;
