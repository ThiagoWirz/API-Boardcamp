import { Router } from "express";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;
