import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, createCategory);

export default categoriesRouter;
