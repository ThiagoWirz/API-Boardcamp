import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesController.js";
import validateGame from "../middlewares/validateGameMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, postGame);

export default gamesRouter;
