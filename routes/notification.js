const sendNotificationByAdmin = require("../controllers/pushNotifiController");
const express = require("express");
const router = express.Router();
// router.post("/send-notification/:id", sendPushNotification);
router.post("/send-notification", sendNotificationByAdmin);
module.exports = router;
// const certPath = admin.credential.cert(serviceAccount);
// admin.initializeApp({ credential: certPath });
// const fcmSettings = {
//   apiKey: "<YOUR_API_KEY>",
//   authDomain: "https://accounts.google.com/o/oauth2/auth",
//   projectId: "project-5e3f1",
// };

// module.exports = router;
