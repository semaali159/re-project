// // const admin = require("firebase-admin");
// // const asynchandler = require("express-async-handler");
// // const cron = require("node-cron");
// // const schedule = require("node-schedule");
// // const { Medicin } = require("../model/medicine");
// // const serviceAccount = require("../test.json");
// // // const serviceAccount = require("../tests.json");

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   projectID: "testt - 24942",
// // });

// // const sendPushNotification = asynchandler(async (req, res) => {
// //   try {
// //     const currentTime = Date.now();
// //     const date = new Date(currentTime);
// //     const registrationToken = req.body.token;
// //     const medicin = await Medicin.find({ EnableNotification: true });

// //     const validMedicin = medicin.filter((item) => date < item.endDate);

// //     validMedicin.forEach((item) => {
// //       const messaging = admin.messaging();
// //       const message = {
// //         notification: {
// //           title: "Enaya",
// //           body: `Please take ${item.medicinName}`,
// //         },
// //         data: {
// //           score: "850",
// //           time: "2:45",
// //         },
// //         token: registrationToken,
// //       };
// //       const repeat = 24 / item.repeat;
// //       const task = cron.schedule(
// //         `*/${repeat} * * * *`,
// //         async () => {
// //           await messaging.send(message).then((response) => {
// //             console.log(
// //               `Cron function executed at ${date} with medicin ${item.medicinName}`
// //             );
// //           });
// //         },
// //         {
// //           scheduled: true,
// //           timezone: "America/Sao_Paulo",
// //         }
// //       );
// //     });

// //     return res.status(200).json({ message: "success" });
// //   } catch (e) {
// //     res.status(400).json({ message: e.message, success: false });
// //   }
// // });
// // module.exports = sendPushNotification;
// const admin = require("firebase-admin");
// const asynchandler = require("express-async-handler");
// const cron = require("node-cron");
// const schedule = require("node-schedule");
// const { Medicin } = require("../model/medicine");
// // const serviceAccount = require("../test.json");
// const serviceAccount = require("../san.json");
// // const serviceAccount = require("../tests.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const sendNotificationByAdmin = asynchandler(async (req, res) => {
//   const myMessage = req.body.myMessage;
//   // const customers = await Customer.find().select("fcmtoken"); //.select("-_id");
//   // //console.log(customers);
//   // const fcmTokens = customers.flatMap((customer) => customer.fcmtoken);

//   // const fcmTokensWithoutQuotes = fcmTokens
//   //   .filter((token) => token)
//   //   .map((token) => token.trim());
//   const fcmTokens = [
//     "d8jE08EsSaqGOIyR4tp0W-:APA91bEk1zqS4kzSVLk7vKk8uMRd1dc3KtvH0fW2DErlnUgLxqBWxsjdGN72YJUfPZ_0r2W2VHnvcgHd3pR31taP7SHQHxb-ob4OSLASmtPZeBIjorJmy5t1zKQ1WnqvuyucDaSy6moG",
//   ];
//   console.log(fcmTokens);

//   const message = {
//     notification: {
//       title: "sad",
//       body: myMessage,
//     },
//     data: {
//       score: "850",
//       time: "2:45",
//     },

//     tokens: fcmTokens,
//   };

//   try {
//     const response = await admin.messaging().sendMulticast(message);
//     console.log("Multicast notification sent:", response);
//     res.status(200).json({ message: "Multicast notification sent", response });
//   } catch (error) {
//     console.error("Error sending multicast notification:", error);
//     res
//       .status(500)
//       .json({ message: "Error sending multicast notification", error });
//   }
// });
// module.exports = sendNotificationByAdmin;
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   projectID: "testt - 24942",
// // });

// // const sendPushNotification = async (req, res) => {
// //   try {
// //     const currentTime = Date.now();
// //     const date = new Date(currentTime);
// //     const registrationToken = [
// //       "d8jE08EsSaqGOIyR4tp0W-:APA91bEk1zqS4kzSVLk7vKk8uMRd1dc3KtvH0fW2DErlnUgLxqBWxsjdGN72YJUfPZ_0r2W2VHnvcgHd3pR31taP7SHQHxb-ob4OSLASmtPZeBIjorJmy5t1zKQ1WnqvuyucDaSy6moG",
// //       "d8jE08EsSaqGOIyR4tp0W-:APA91bEk1zqS4kzSVLk7vKk8uMRd1dc3KtvH0fW2DErlnUgLxqBWxsjdGN72YJUfPZ_0r2W2VHnvcgHd3pR31taP7SHQHxb-ob4OSLASmtPZeBIjorJmy5t1zKQ1WnqvuyucDaSy6moG",
// //     ];
// //     const medicin = await Medicin.findById(req.params.id);
// //     console.log(medicin.EnableNotification);
// //     const flag = medicin.EnableNotification;
// //     const messaging = admin.messaging();

// //     console.log(flag);
// //     if (flag) {
// //       const message = {
// //         notification: {
// //           title: "Enaya",
// //           body: ` please take ${medicin.medicinName}`,
// //         },
// //         data: {
// //           score: "850",
// //           time: "2:45",
// //         },
// //         tokens: registrationToken,
// //       };
// //       // `0 */${repeat} * * *`
// //       const repeat = 24 / medicin.repeat;
// //       console.log(repeat);
// //       task = cron.schedule(
// //         `*/${repeat} * * * *`,
// //         async () => {
// //           if (date < medicin.endDate) {
// //             await messaging.sendMulticast(message).then((response) => {
// //               console.log(`cron function executed at ${date}`);
// //             });

// //             console.log(repeat);
// //             console.log(medicin.endDate);
// //             console.log(`cron function executed at ${date}`);
// //           } else {
// //             console.log("wee");
// //             task.destroy();
// //           }
// //         },
// //         {
// //           scheduled: true,
// //           timezone: "America/Sao_Paulo",
// //         }
// //       );
// //     }
// //     return res.status(200).json({ message: "sucess" });
// //   } catch (e) {
// //     res.status(400).json({ message: e.message, success: false });
// //   }
// // };

// // module.exports = sendPushNotification;
