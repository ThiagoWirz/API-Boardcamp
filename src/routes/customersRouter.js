import { Router } from "express";
import { validateCustomer } from "../middlewares/validateCustomerMiddleware";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateCustomer);
