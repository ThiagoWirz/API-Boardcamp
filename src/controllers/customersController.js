import db from "../db";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (!cpf) {
      const { rows: customers } = await db.query("SELECT * FROM customers");
      return res.send(customers);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
