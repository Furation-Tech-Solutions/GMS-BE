// import axios from "axios";
// import { Router } from "express";
// // import { NextFunction, Request, Response } from "express";
// // const axios = require('axios');



// export const whatsAppRouter=Router()



// const url = 'https://graph.facebook.com/v18.0/119774074543287/messages';
// const accessToken = 'EAAIjVZA1T21gBOxf3KZBuj3EDSPpDoeoP4yIUgmG0mUxG5Gdgwfpv8ycXh7EbbUokh4LvBmG08knpLB03ai6qanmtUILGL3MvQo2ptw1jQhIbGDQlHjiZAg51clrsJvZBIbtooZA1tj7zHwpz7lLkZASzZAvnQfusPpmLkp1PL6jEh1MLQhZBX1KtXltxvaRYnwMMsLZAZCzx21xNKZCkLuR2HCDKCHTZCEZD';

// whatsAppRouter.post("/add",()=>{
// //     // res.send("hello  chat")}
// //     console.log(req)
//     // const accessToken = 'EAALxkVb61nABOx09TLGZAX9UvZASA00C1mzjeohVRGYB1aurPokPc7es9S7iHATDGKROaK8bgRqctYBweFcmT1ywFSb6CMOZCkwtZAZCxwpCu0tbvlZAKmqoFNDlNnZBcJqB3vks6mcxNCCZCxnT0ozdfnbPtzij8TZBys3W4jNWhy4wH9gtd19Cjx5EOwIhtpPaQs6Sh72yuFmfkp2GmniMZD'; // Replace with your access token



// axios({
//     method: "POST", // Required, HTTP method, a string, e.g. POST, GET
//     url:
//       "https://graph.facebook.com/v12.0/" +
//       "119774074543287" +
//       "/messages?access_token=" +
//       "EAAIjVZA1T21gBOxf3KZBuj3EDSPpDoeoP4yIUgmG0mUxG5Gdgwfpv8ycXh7EbbUokh4LvBmG08knpLB03ai6qanmtUILGL3MvQo2ptw1jQhIbGDQlHjiZAg51clrsJvZBIbtooZA1tj7zHwpz7lLkZASzZAvnQfusPpmLkp1PL6jEh1MLQhZBX1KtXltxvaRYnwMMsLZAZCzx21xNKZCkLuR2HCDKCHTZCEZD",
//     data: {
//       messaging_product: "whatsapp",
//       to: 9881239491,
//       type: "text",
//       text: {
//         // the text object
//         body: "hi",
//       },
//     },
//     headers: { "Content-Type": "application/json" },
//   });
// //   res.send("success")
// })

// // const url = 'https://graph.facebook.com/v18.0/105954558954427/messages';

// // axios.post(url, data, { headers })
// //   .then((response:any) => {
// //     console.log('Response:', response.data);
// //   })
// //   .catch((error:any) => {
// //     console.error('Error:', error);
// //   });
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

//     // res.send("success")
// // })


// // whatsAppRouter.get("/",(req:Request,res:Response)=>{
// //     // res.send("hello  chat")}
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
// //   .then(response => {
// //     console.log('Response:', response.data);
// //   })
// //   .catch(error => {
// //     console.error('Error:', error);
// //   });

// //     res.send("success")
// // })
// import axios from "axios";
import { Router } from "express";
import { NextFunction, Request, Response } from "express";
const axios = require('axios');



export const whatsAppRouter=Router()

whatsAppRouter.post("/add",async(req:Request,res:Response)=>{
  
  const apiUrl = 'https://graph.facebook.com/v17.0/121686631017880/messages';
  const accessToken = 'EAAIjVZA1T21gBO6ZCnZCNIKi8HaZAJPFycDRgjpEG89mTsLccZCktDL4GEnSUjHjaJLhmos5Il5QFi1eV8kYAo73oBvZADke0netXiZBAAvEk0RqvMrgRZC0cVao3TITGJiaC6PueZBBVZAZBMsWCFiq8PqaRJsG81Xk1ffA9IwcDXWZAAynLJ7BOCnoivd0sjz5nPjWvw5BWi6bnXDDiDFMIxpF2lk7v0UxegZDZD'; // Replace with your actual access token

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const data = {
    "messaging_product": 'whatsapp',
     "recipient_type": 'individual',
    "to": '919881239491',
    "type": 'text',
     "text": {
          "preview_url": false,
          "body":'welcome to gms'
        }
    // template: {
    //   name: 'hello_world',
    //   language: {
    //     code: 'en_US',
    //   },
    // },
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    res.send("message send successfully")

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }

})



