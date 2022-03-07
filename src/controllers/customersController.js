import db from "../db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
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
    phone: 3,
    cpf: 4,
    birthday: 5,
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
    if (!cpf) {
      const { rows: customers } = await db.query(
        `SELECT * FROM customers 
        ${offset}
        ${limit}
        ${orderBy}`
      );
      return res.send(customers);
    }

    const { rows: customers } = await db.query(
      `SELECT * FROM customers WHERE cpf LIKE ($1)
      ${offset}
      ${limit}
      ${orderBy}`,
      [`${cpf}%`]
    );
    return res.send(customers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;
  try {
    const customer = await db.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);

    if (customer.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.send(customer.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  try {
    await db.query(
      "UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5",
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
