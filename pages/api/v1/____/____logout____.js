// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
import sendToken from "@/utils/jwtToken";
import User from '@/utils/Models/userModal'
export default async function handler(req, res) {
  if(req.method == 'GET'){
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
  }else{
    res.status(500).json()
  }
}
