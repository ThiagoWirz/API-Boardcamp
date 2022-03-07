import db from "../db.js";

export async function getGames(req, res) {
  const { name, offset, limit } = req.query;

  try {
    if (!name) {
      const { rows: games } = await db.query(
        `SELECT g.*, c.name as "categoryName" FROM games g JOIN categories c ON g."categoryId" = c.id ${
          offset && `OFFSET ${parseInt(offset)}`
        } ${limit && `LIMIT ${parseInt(limit)}`}`
      );
      return res.send(games);
    }
    const { rows: games } = await db.query(
      `SELECT g.*, c.name AS "categoryName" FROM games g WHERE LOWER (name) LIKE LOWER($1) JOIN categories c ON g."categoryId" = c.id ${
        offset && `OFFSET ${parseInt(offset)}`
      } ${limit && `LIMIT ${parseInt(limit)}`}`,
      [`${name}%`]
    );
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await db.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [
        name,
        image,
        parseInt(stockTotal),
        parseInt(categoryId),
        parseInt(pricePerDay),
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
