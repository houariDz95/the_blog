import { db }  from '../../../db.js';
import  Jwt  from 'jsonwebtoken';
export default function handler(req, res) {
  if(req.method === "GET"){
    const {category} = req.query;
    const q = "SELECT * FROM posts";

    db.query(q, [category], (err, data) => {
      if(err) return res.status(500).json(err);

      return res.status(200).json(data)
    })
  }

  if(req.method === "POST"){
    const token = req.cookies.token;
    if(!token) return res.status(401).json('Not Authenticated!');

    Jwt.verify(token, 'jwtkey', (err, userInfo) => {
      if(err) return res.status(403).json("token is not valide!");

      const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id
      ]
    
      db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json('Post has been created!')
      })
    })
  }
}