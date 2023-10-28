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
    const headers = {
      Authorization: `Bearer EAAIjVZA1T21gBOyxqFTDaFmE2cyDYZCnZAMt7ofZBvajNgnMWsHjfcNJcQdt9dp0MX3jdO0zNZCuL8yF9JCqOVDrEM4FU4i1CO8fuT0lwecun4vvchFUCJWu984nfyPZBgpR6ki0FKsyIDx6BzVNv8dpEG9nfoO49MRZBPecJVIHjtrehb5EZAcPljQZBY8f8gRybQMUhI68fxbF8kWIZCZAT7ZCSWVYLwW68UFCV1TaErAZD`,
      'Content-Type': 'application/json',
    };
    const apiurl:string=env.apiUrl??"https://graph.facebook.com/v17.0/121686631017880/messages"

    const whatsappData = {
      "messaging_product": "whatsapp",
      "recipient_type": "individual",
      "to": `${recipient}`,
      // "to": "919881239491",
      "type": "template",
      "template": message
    }

    try {
      const response= await axios.post("https://graph.facebook.com/v17.0/151367741389078/messages", whatsappData, { headers });
      console.log(response,"response of whatsapp data")
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default WhatsAppService;
