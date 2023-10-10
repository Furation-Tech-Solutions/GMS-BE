import axios, { AxiosResponse, AxiosError } from 'axios';

class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;

  constructor(apiUrl?: string, accessToken?: string) {
    this.apiUrl = apiUrl || "https://graph.facebook.com/v17.0/121686631017880/messages";
    this.accessToken = accessToken || "EAAIjVZA1T21gBO6ZCnZCNIKi8HaZAJPFycDRgjpEG89mTsLccZCktDL4GEnSUjHjaJLhmos5Il5QFi1eV8kYAo73oBvZADke0netXiZBAAvEk0RqvMrgRZC0cVao3TITGJiaC6PueZBBVZAZBMsWCFiq8PqaRJsG81Xk1ffA9IwcDXWZAAynLJ7BOCnoivd0sjz5nPjWvw5BWi6bnXDDiDFMIxpF2lk7v0UxegZDZD";
  }

  async sendWhatsAppMessage(recipient: string, message: string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    const whatsappData = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipient,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    };

    try {
      const response: AxiosResponse<any> = await axios.post(this.apiUrl, whatsappData, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default WhatsAppService;
