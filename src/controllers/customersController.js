import db from "../db";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (!cpf) {
      const { rows: customers } = await db.query("SELECT * FROM customers");
      return res.send(customers);
    }

    const { rows: customers } = await db.query(
      "SELECT * FROM customers WHERE cpf LIKE ($1)",
      [`${cpf}%`]
    );
    return res.send(customers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
