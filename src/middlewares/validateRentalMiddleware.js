import db from "../db";
import rentalSchema from "../schemas/rentalSchema";

export async function validateRental(req, res, next) {
  const validation = rentalSchema.validate(req.body);

  if (validation.error) {
    res.sendStatus(400);
    return;
  }

  const { customerId, gameId, daysRented } = req.body;

  if (parseInt(daysRented) <= 0) {
    return res.sendStatus(400);
  }

  try {
    const game = await db.query("SELECT id FROM games WHERE id = $1", [gameId]);

    if (game.rowCount === 0) {
      return res.sendStatus(400);
    }

    const customer = await db.query("SELECT id FROM customers WHERE id = $1", [
      customerId,
    ]);

    if (customer.rowCount === 0) {
      return res.sendStatus(400);
    }

    const count = await db.query(
      'SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" is null',
      [gameId]
    );

    const stock = game.rows[0].stockTotal;
    const rentals = count.rowCount;

    if (stock - rentals === 0) {
      res.sendStatus(400);
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
