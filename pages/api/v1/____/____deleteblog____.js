// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
export default async function handler(req, res) {
  if(req.method == 'GET'){
    console.log("GET");
  }
  connectDatabase();
  let result = {};
  closeConnection();
  res.status(200).json(result)
}
