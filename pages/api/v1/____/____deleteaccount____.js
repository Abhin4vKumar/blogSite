// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
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
    await user.remove();
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
    return;
  }else{
    res.status(500).json()
  }
}
