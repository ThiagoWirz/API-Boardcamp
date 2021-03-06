import dayjs from "dayjs";
import db from "../db.js";

export async function getRentals(req, res) {
  let inputCustomerId = "";
  if (req.query.customerId) {
    inputCustomerId = `WHERE c.id = ${parseInt(req.query.customerId)}`;
  }

  let inputGameId = "";
  if (req.query.gameId) {
    inputGameId = `WHERE c.id = ${parseInt(req.query.gameId)}`;
  }

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
    customerId: 2,
    gameId: 3,
    rentDate: 4,
    daysRented: 5,
    returnDate: 6,
    originalPrice: 7,
    delayFee: 8,
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
    const { rows: rentals } = await db.query({
      text: `
      SELECT
        r.*,
        c.id AS "customerId",c.name AS "customerName",
        g.id AS "gameId", g.name AS "gameName", g."categoryId", 
        ca.name AS "categoryName"
      FROM rentals r
        JOIN customers c ON r."customerId" = c.id 
        JOIN games g ON r."gameId" = g.id 
        JOIN categories ca ON  g."categoryId" = ca.id
      ${inputCustomerId}
      ${inputGameId}
      ${offset}
      ${limit}
      ${orderBy}`,
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
        parseInt(daysRented),
        null,
        pricePerDay[0].pricePerDay * parseInt(daysRented),
        null,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function returnRental(req, res) {
  const { id } = req.params;
  const returnDate = dayjs().format("YYYY-MM-DD");
  const rentDate = req.locals.rentDate;
  const pricePerDay =
    parseInt(req.locals.originalPrice) / parseInt(req.locals.daysRented);
  const delayDays = dayjs().diff(
    dayjs(rentDate).add(req.locals.daysRented, "day"),
    "day"
  );
  const delayFee = delayDays > 0 ? parseInt(delayDays) * pricePerDay : 0;

  try {
    await db.query(
      'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id=$3',
      [returnDate, delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM rentals WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
