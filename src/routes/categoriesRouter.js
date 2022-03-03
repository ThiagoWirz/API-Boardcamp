import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/validateCategoryMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, createCategory);

export default categoriesRouter;
