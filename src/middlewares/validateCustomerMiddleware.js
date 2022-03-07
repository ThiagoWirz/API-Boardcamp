import db from "../db";
import customerSchema from "../schemas/customerSchema";

export async function validateCustomer(req, res, next) {
  const validation = customerSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(400);
  }

  const { cpf } = req.body;

  try {
    const customer = await db.query("SELECT id FROM customers WHERE cpf = $1", [
      cpf,
    ]);

    if (customer.rowCount !== 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
