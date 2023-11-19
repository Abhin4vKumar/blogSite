// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
import User from "@/utils/Models/userModal"
export default async function handler(req, res) {
  if(req.method == 'GET'){
    const {username} = req.params;
    connectDatabase();
    const user = await User.findOne({username});
    closeConnection();
    if(!user){
      res.status(200).json({success:false , error:"User not Found"});
      return;
    }
    res.status(200).json({success:true , user : user});
  }else{
    res.status(500).json({success:false , error:"Internal Server Error"});
  }
}
