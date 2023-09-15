import { Router } from "express";
import { NextFunction, Request, Response } from "express";
const axios = require('axios');



export const whatsAppRouter=Router()

const url = 'https://graph.facebook.com/v18.0/FROM_PHONE_NUMBER_ID/messages';
const accessToken = 'ACCESS_TOKEN';

whatsAppRouter.get("/",(req:Request,res:Response)=>{
    // res.send("hello  chat")}
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      
      const data = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: 'PHONE_NUMBER',
        type: 'text',
        text: {
          preview_url: false,
          body: 'MESSAGE_CONTENT'
        }
      };
// 
    axios.post(url, data, { headers })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

    
})







