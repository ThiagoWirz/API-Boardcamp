import { Router } from "express";
import {
  getCustomer,
  getCustomers,
} from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/validateCustomerMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateCustomer, createCustomer);
