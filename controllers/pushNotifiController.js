const admin = require("firebase-admin");
const fcm = require("fcm-node");
const serviceAccount = process.env.CREDENTIALS;
const asynchandler = require("express-async-handler");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectID: "testt - 24942",
});
//senderid 1080081962593
// const certPath = admin.credential.cert(serviceAccount);
 
// var FCM = new fcm(serviceAccount.private_key);
sendPushNotification = asynchandler(async (req, res) => {
  const registrationToken =req.body.token

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.

  var messaging = admin.messaging();
  // messaging.send(message, function (err, resp) {
  //   if (err) {
  //     return res.status(500).json({ message: err });
  //   } else {
  //     return res.status(200).json({ message: "notification send", resp });
  //   }
  // });
  // FCM.send(message, (err, response) => {
  //   if (err) {
  //     console.log(serviceAccount.private_key);

  //     console.log("Error sending message:", err);
  //     return res.status(500).json({ message: "error", error: err });
  //   } else {
  //     console.log("Successfully sent message:", response);
  //     return res.status(200).json({ message: "successfully", response });
  //   }
  // });
  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      return res.status(200).json({ message: "successfully", response });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
  // let message = {
  //   to: "d8jE08EsSaqGOIyR4tp0W-:APA91bEk1zqS4kzSVLk7vKk8uMRd1dc3KtvH0fW2DErlnUgLxqBWxsjdGN72YJUfPZ_0r2W2VHnvcgHd3pR31taP7SHQHxb-ob4OSLASmtPZeBIjorJmy5t1zKQ1WnqvuyucDaSy6moG",
  //   notification: {
  //     title: "test Notificatio",
  //     body: "notification message",
  //   },
  //   data: {
  //     orderId: "123545",
  //     orderDate: "2022-10-20",
  //   },
  // };
  // FCM.send(message, function (err, resp) {
  //   if (err) {
  //     return res.status(500).json({ message: err });
  //   } else {
  //     return res.status(200).json({ message: "notification send", resp });
  //   }
  // });
});

module.exports = sendPushNotification;
