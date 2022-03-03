import { Router } from "express";
import { getGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, postGames);

export default gamesRouter;
