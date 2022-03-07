import dayjs from "dayjs";
import db from "../db";

export async function getRentals(req, res) {
  const { inputCustomerId, inputGameId } = req.query;

  try {
    const { rows: rentals } = await db.query({
      text: `
      SELECT
        r.*,
        c.id AS "customerId",c.name AS "customerName",
        g.id AS "gameId", g.name AS "gameName", g."categoryId", 
        ca.name AS "categoryName"
      FROM rentals r
        JOIN customers c ON r."customersId" = c.id 
        JOIN games g ON r."gameId" = g.id 
        JOIN categories ca ON  g."categoryId" = ca.id
      ${inputCustomerId && `WHERE c.id = ${parseInt(inputCustomerId)}`}
      ${inputGameId && `WHERE c.id = ${parseInt(inputGameId)}`}`,
      rowMode: "array",
    });

    res.send(
      rentals.map((row) => {
        const [
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customerName,
          gameName,
          categoryId,
          categoryName,
        ] = row;
        return {
          id,
          customerId,
          gameId,
          rentDate,
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customerId,
            name: customerName,
          },
          game: {
            id: gameId,
            name: gameName,
            categoryId,
            categoryName,
          },
        };
      })
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const rentDate = dayjs().format("YYYY-MM-DD");

  try {
    const { rows: pricePerDay } = await db.query(
      'SELECT "pricePerDay" FROM games WHERE id = $1',
      [gameId]
    );

    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        null,
        pricePerDay.pricePerDay * daysRented,
        null,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
