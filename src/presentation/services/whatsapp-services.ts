// import axios, { AxiosResponse, AxiosError } from 'axios';
import env from '@main/config/env';
const axios = require('axios');


class WhatsAppService {
//   private apiUrl: string;
//   private accessToken: string;

//   constructor(apiUrl?: string, accessToken?: string) {
//     this.apiUrl = apiUrl || "https://graph.facebook.com/v17.0/121686631017880/messages";
//     this.accessToken = accessToken || "EAAIjVZA1T21gBOyWDgaKWZCnChtc5ojhSnGuHjbQT2sA3lTiFlFWoGBXdf8vVma8p8sIAgLCbvt9qpGSnW6msi0M9n7nGO5MzqWIiyjhZB5uCCiHiIC3fw1vqVVtZAvuKXDWZBKH3iQ7g7rONZArZBRTBnayrAVbA459IVRJyZA6a5cPszMhlRBio3lLzHwuI2acM9WtcBhFioJumSxHnZBF6hZCJqLAcZD"
//   }
//   constructor(){

//   }
 
  async sendWhatsAppMessage(recipient: string, message: string): Promise<any> {
    const accesstoken=env.accessToken
    const headers = {
      Authorization: 'Bearer EAAIjVZA1T21gBOw0PnsssvCjCV2OJrgbOPDJm9oKhRyd4VUGD5AdCZCzmYvVDEbs0WkqnaiCZCKbZBoOJHI4qmAZCKuldKN0h95XxtkbbHsXExwn5IvdiJdZBC9by3h0pqxLQfyeIHZACvF3rqTn5Ca16dsyca7Exi35s2l5HQ2GXBIGA6IN1bGSyyZAwH8UuR1lAHJwsn2H8lIBjaxLCdN8iN4jWzgZD',
      'Content-Type': 'application/json',
    };
    const apiurl:string=env.apiUrl??"https://graph.facebook.com/v17.0/121686631017880/messages"

    const whatsappData = {
      "messaging_product": 'whatsapp',
      "recipient_type": 'individual',
      "to": `${recipient}`,
    //   "to": "919881239491",
      "type": 'text',
      "text": {
        "preview_url": false,
        "body": `${message}`
      }
    }

    try {
      const response= await axios.post("https://graph.facebook.com/v17.0/121686631017880/messages", whatsappData, { headers });
      console.log(response,"response of whatsapp data")
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default WhatsAppService;
