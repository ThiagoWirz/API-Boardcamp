import { Router } from "express";
import {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customersController.js";
import {
  validateCustomer,
  validateCustomerUpdate,
} from "../middlewares/validateCustomerMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateCustomer, createCustomer);
customersRouter.put("/customers/:id", validateCustomerUpdate, updateCustomer);
