// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { isAuthenticatedUser } from "@/utils/auth"

// const mongoose = require('mongoose');
export default async function handler(req, res) {
  if(req.method == 'GET'){
    return isAuthenticatedUser(req,res);
  }else{
    res.status(500).json()
  }
}
