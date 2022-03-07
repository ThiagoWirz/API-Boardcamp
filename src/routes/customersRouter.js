import { Router } from "express";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
