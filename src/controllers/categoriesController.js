import db from "../db.js";

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await db.query("SELECT * FROM categories");
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
