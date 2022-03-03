import db from "../db.js";
import gameSchema from "../schemas/gameSchema.js";

export default async function validateGame(req, res, next) {
  const validation = gameSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(422);
  }

  const { name, stockTotal, pricePerDay } = req.body;

  if (parseInt(stockTotal) <= 0 || parseInt(pricePerDay) <= 0) {
    return res.sendStatus(400);
  }

  try {
    const sameName = await db.query("SELECT id from games WHERE name=$1", [
      name,
    ]);

    if (sameName.rowCount > 0) {
      return res.sendStatus(409);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
