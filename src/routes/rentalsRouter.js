import { Router } from "express";
import { createRental, getRentals } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/validateRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, createRental);

export default rentalsRouter;
