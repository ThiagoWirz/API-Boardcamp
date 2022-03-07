import { Router } from "express";
import { createRental, getRentals } from "../controllers/rentalsController.js";
import {
  validateRental,
  validateReturnRental,
} from "../middlewares/validateRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, createRental);
rentalsRouter.post("/rentals/:id/return", validateReturnRental);

export default rentalsRouter;
