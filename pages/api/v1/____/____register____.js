// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
import sendToken from "@/utils/jwtToken";
import User from '@/utils/Models/userModal'
export default async function handler(req, res) {
  if(req.method == 'POST'){
    const {email , username , password} = req.body;
    connectDatabase();
    const user = await User.create({
      name , username , email , password , avatar :{
        status:false
      }
    });
    closeConnection();
    sendToken(user , 200 , res);
  }else{
    res.status(500).json()
  }
}

