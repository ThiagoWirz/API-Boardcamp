import db from "../db.js";

export async function getCategories(req, res) {
  let offset = "";
  if (req.query.offset) {
    offset = `OFFSET ${req.query.offset}`;
  }

  let limit = "";
  if (req.query.limit) {
    limit = `LIMIT ${req.query.limit}`;
  }

  const orderByFilter = {
    id: 1,
    name: 2,
  };
  let orderBy = "";
  if (req.query.order && orderByFilter[req.query.order]) {
    if (req.query.desc) {
      orderBy = `ORDER BY ${orderByFilter[req.query.order]} DESC`;
    } else {
      orderBy = `ORDER BY ${orderByFilter[req.query.order]}`;
    }
  }
  try {
    const { rows: categories } = await db.query(
      `SELECT * FROM categories 
      ${offset}
      ${limit}
      ${orderBy}`
    );
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createCategory(req, res) {
  const { name } = req.body;

  try {
    await db.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
