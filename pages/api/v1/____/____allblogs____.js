// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const mongoose = require('mongoose');
import {connectDatabase , closeConnection} from "@/utils/database"
import Blog from "@/utils/Models/blogModal"
export default async function handler(req, res) {
  if(req.method == 'GET'){
    connectDatabase();
    let result = await Blog.find({});
    closeConnection();
    res.status(200).json({success:true , allBlogs : result})
  }else{
    res.status(500).json({success:false,error:"Internal Server Error"});
  }
}
