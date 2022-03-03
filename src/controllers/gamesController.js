import db from "../db.js";

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    if (!name) {
      const { rows: games } = await db.query("SELECT * FROM games");
      return res.send(games);
    }
    const { rows: games } = await db.query(
      "SELECT * FROM games WHERE LOWER (name) LIKE LOWER($1)",
      [name]
    );
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
