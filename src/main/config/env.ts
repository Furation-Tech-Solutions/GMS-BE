require("dotenv").config();

export default {
  port: process.env.PORT ?? 3000,
  mongoUrl: process.env.MONGO_URL,
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ADMINPANEL",
  },
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "XXXXXXXXXXXXXXXXXXXX",
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ??
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
};
