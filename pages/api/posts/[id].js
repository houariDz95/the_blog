import jwt from 'jsonwebtoken';
import { db } from '../../../db.js';
export default  function handler(req, res) {
const {id} = req.query;
  if(req.method === "GET"){
    const q =  
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date`, `uid` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
    db.query(q, [id], (err, data) => {
      if(err) return res.status(500).json(err);

      return res.status(200).json(data)
    })
  }

  if(req.method === "DELETE"){
    const token = req.cookies.token;
    if(!token) return res.status(401).json('Not Authenticated!');
    jwt.verify(token, 'jwtkey', (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const q = "DELETE FROM posts WHERE `id`= ? AND `uid`= ?";
      db.query(q, [id, userInfo.id], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("post has been deleted")
      })
    })
  }

  if(req.method === "PUT"){
    const token = req.cookies.token;
    if(!token) return res.status(401).json('Noth authenticated!');
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if(err) return res.status(403).json("Token is not valid!");

      const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?";
      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

      db.query(q, [...values, id, userInfo.id], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.json("post has been updated");
    })
  })
  }
}