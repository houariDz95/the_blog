import { db }  from '../../../db.js';
import bcrypt from "bcrypt";

export default function handler(req, res) {
  if (req.method === 'GET') {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
      if(err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
 }

 if(req.method === "POST"){
  const q = "SELECT *FROM users WHERE username = ? OR email = ?";
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if(err)return res.status(500).json(err);
    if(data.length) return res.status(409).json('user alredy exists!');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    })
  })
 }
}
