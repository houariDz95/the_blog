import { db }  from '../../../db.js';

export default function handler(req, res) {
  if(req.method === "GET"){
    const {cat} = req.query;
    const q =  "SELECT * FROM posts WHERE cat=? ";
    db.query(q, [cat], (err, data) => {
      if(err) return res.status(500).json(err);

      return res.status(200).json(data)
    })
  }
}