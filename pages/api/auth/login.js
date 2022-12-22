import { db }  from '../../../db.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from 'cookie';

export default function handler(req, res){
  if (req.method === 'GET') {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
      if(err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
 }

  if(req.method === "POST"){
  //CHECK USER
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.MODE_ENV || 'development',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    }))
    
    return res.status(200).json(other)
  });
  }
};