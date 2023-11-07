require("dotenv").config();


export default {
  port: process.env.PORT ?? 3000,
  mongoUrl: process.env.MONGO_URL,
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ADMINPANEL",
  },
  mongoUrlWinston: process.env.MONGO_URL_WINSTON,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "XXXXXXXXXXXXXXXXXXXX",
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ??
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  mailhost: process.env.HOST,
  sendmailport: process.env.MAILPORT,
  user: process.env.DOMAIN_MAIL,
  from: process.env.FROM,
  password: process.env.PASSWORD,
  apiUrl:process.env.APIURL,
accessToken:process.env.ACCESS_TOKEN,
 phoneNumberId:process.env.PHONE_NUMBER_ID
};

