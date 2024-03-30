const sendPushNotification = require("../controllers/pushNotifiController");
const express = require("express");
const router = express.Router();
router.post("/send-notification", sendPushNotification);
module.exports = router;
// const certPath = admin.credential.cert(serviceAccount);
// admin.initializeApp({ credential: certPath });
// const fcmSettings = {
//   apiKey: "<YOUR_API_KEY>",
//   authDomain: "https://accounts.google.com/o/oauth2/auth",
//   projectId: "project-5e3f1",
// };
