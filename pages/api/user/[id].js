import { db }  from '../../../db.js';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if(req.method === "GET"){
    const {id} = req.query;
    console.log(id)
    const q = "SELECT * FROM users WHERE id=?";
    db.query(q, [id], (err, data) => {
      if(err) return res.status(500).json(err);

      return res.status(200).json(data)
    })
  }
  if(req.method === "PUT"){
    const token = req.cookies.token;
    if(!token) return res.status(401).json('Noth authenticated!');
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if(err) return res.status(403).json("Token is not valid!");

      const q = "UPDATE users SET `img`=? WHERE `id`=? ";
      const values = [req.body.img];

      db.query(q, [...values, userInfo.id], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("user has been updated");
    })
  })
  }
}