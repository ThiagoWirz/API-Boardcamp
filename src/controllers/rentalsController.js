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
