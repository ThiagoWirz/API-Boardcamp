import { Router } from "express";
import { getRentals } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/validateRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental);

export default rentalsRouter;
