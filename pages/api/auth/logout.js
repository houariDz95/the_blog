
import { clearCookie } from "cookie"
export default function handler(req, res){
  if (req.method === 'POST') {
    res.removeHeader('Set-Cookie');
    return res.status(200).json("user logged out")
 }
}
