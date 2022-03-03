import db from "../db";

export async function validateCategoty(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }
  try {
    const sameName = await db.query("SELECT id FROM categories WHERE name=$1", [
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
