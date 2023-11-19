// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
import sendToken from "@/utils/jwtToken";
import User from '@/utils/Models/userModal'
export default async function handler(req, res) {
  if(req.method == 'POST'){
    const {username , password} = req.body;
    connectDatabase();
    const user = await User.findOne({username}).select("+password");
    if(!user){
      res.status(401).json({success:false,error:"Username and Password are Incorrect !"});
      return;
    }
    let isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
      res.status(401).json({success:false,error:"Username and Password are Incorrect !"});
      return;
    }
    closeConnection();
    return sendToken(user , 200 , res);
  }else{
    res.status(500).json()
  }
}
