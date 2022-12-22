import mysql from 'mysql';

export const db = mysql.createConnection({
  host: process.env.NEXT_MYSQL_URL,
  user:"root",
  password: process.env.PASSWORD,
  database:"edd"
})