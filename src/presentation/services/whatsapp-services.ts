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
 
  async sendWhatsAppMessage(recipient: string, message: any): Promise<any> {
    const accesstoken=env.accessToken
    const phoneNumberId=env.phoneNumberId
    const headers = {
      Authorization: `Bearer ${accesstoken}`,
      'Content-Type': 'application/json',
    };
    // const apiurl:string=env.apiUrl??"https://graph.facebook.com/v17.0/121686631017880/messages"
     const apiurl:string=`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`??"https://graph.facebook.com/v17.0/151367741389078/messages"

    const whatsappData = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": `${recipient}`,
      // "to": "919881239491",
      "type": "template",
      "template": message
    }

    try {
      const response= await axios.post(apiurl, whatsappData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default WhatsAppService;
