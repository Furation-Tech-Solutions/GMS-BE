import { Router } from "express";
// import { NextFunction, Request, Response } from "express";
// const axios = require('axios');



export const whatsAppRouter=Router()


// // const url = 'https://graph.facebook.com/v18.0/FROM_PHONE_NUMBER_ID/messages';
// // const accessToken = 'EAALxkVb61nABOx09TLGZAX9UvZASA00C1mzjeohVRGYB1aurPokPc7es9S7iHATDGKROaK8bgRqctYBweFcmT1ywFSb6CMOZCkwtZAZCxwpCu0tbvlZAKmqoFNDlNnZBcJqB3vks6mcxNCCZCxnT0ozdfnbPtzij8TZBys3W4jNWhy4wH9gtd19Cjx5EOwIhtpPaQs6Sh72yuFmfkp2GmniMZD';

// whatsAppRouter.post("/add",(req:Request,res:Response)=>{
//     // res.send("hello  chat")}
//     console.log(req)
//     const accessToken = 'EAALxkVb61nABOx09TLGZAX9UvZASA00C1mzjeohVRGYB1aurPokPc7es9S7iHATDGKROaK8bgRqctYBweFcmT1ywFSb6CMOZCkwtZAZCxwpCu0tbvlZAKmqoFNDlNnZBcJqB3vks6mcxNCCZCxnT0ozdfnbPtzij8TZBys3W4jNWhy4wH9gtd19Cjx5EOwIhtpPaQs6Sh72yuFmfkp2GmniMZD'; // Replace with your access token

// const data = {
//   messaging_product: 'whatsapp',
//   to: '9881239491',
//   type: 'template',
//   template: {
//     name: 'hello_world',
//     language: {
//       code: 'en_US'
//     }
//   }
// };

// const headers = {
//   'Authorization': `Bearer ${accessToken}`,
//   'Content-Type': 'application/json'
// };

// const url = 'https://graph.facebook.com/v18.0/105954558954427/messages';

// axios.post(url, data, { headers })
//   .then((response:any) => {
//     console.log('Response:', response.data);
//   })
//   .catch((error:any) => {
//     console.error('Error:', error);
//   });
// //     const headers = {
// //         'Authorization': `Bearer ${accessToken}`,
// //         'Content-Type': 'application/json',
// //       };
      
// //       const data = {
// //         messaging_product: 'whatsapp',
// //         recipient_type: 'individual',
// //         to: 'PHONE_NUMBER',
// //         type: 'text',
// //         text: {
// //           preview_url: false,
// //           body: 'MESSAGE_CONTENT'
// //         }
// //       };
// // // 
// //     axios.post(url, data, { headers })
// //   .then(res:any => {
// //     console.log('Response:', res.data);
// //   })
// //   .catch(error => {
// //     console.error('Error:', error);
// //   });

//     res.send("success")
// })







