// const mongoose = require("mongoose");
// const Joi = require("joi");
// const diseasesSchema = new mongoose.Schema(
//   {
//     diseasesName: {
//       type: string,
//       required: true,
//     },
//     description: {
//       type: string,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Diseases = mongoose.model("Diseases", diseasesSchema);
// module.exports = { Diseases };

// import dotenv from "dotenv";
// dotenv.config({
//     path: "../.env",
// });
// import FCM from "fcm-node";
// const serverKey = "AAAA1FErZBc:APA91bEdl226AG4kugySkvdLSds0OYydfudtdIiZNn4doyNCg7ikdpu7wWwpd_tlNGye-oocmhpq4VACLB4ywlW00-w8wICJ3MIoTD4dnYNaUolADqTz3DtUU9RxOAShTnXjaf61wyO3RiX42";
// const senderId = 919486495519;

// const fcm = new FCM("AAAAkU9s2CI:APA91bEkUByVw52NC0g6sKpxys8V01NhYQLDFRBsZv59RdM5i6aRLLmChAqXCQokXE2jEx-yL2HrZIyH8hgquJg-QTIaSxP6Zj8FaeoOLkr6hoipxVctCH7ddmJptb1ode9XtLic5eWxM");

// var collapseKey = Math.random().toString(36).substring(2, 10);

// export default {
//     send: async (token, notificationData, next) => {

//         const message = {
//             to: "fGD5gxO6bu-smiauxLg8r-:APA91bF-IEPBiZjTa46kLg19xwCTBPJk1Nmedx5u_G282jjfds7QcoVd95OHBJ4e2lnidKkh8Wh0Wwzj4cX8UWA1gwG70RJjjQyPpdhR736NBam4CPqRjNuWnxnhrR2kkZhtjVW-aORFi",
//             notification: {
//                 title: notificationData.title,
//                 body: notificationData.message,
//             },
//             data: {
//                 click_action: "FLUTTER_NOTIFICATION_CLICK",
//             },
//         };

//         fcm.send(message, function (err, response) {
//             if (err) {
//                 console.log(err, "1");
//             } else {
//                 console.log("success sended");
//                 return response;
//             }
//         });
//     },
//     sendMultiple: async (tokens, notificationData, next) => {
//         console.log(serverKey);
//         console.log(tokens);

//         const message = {
//             registration_ids: tokens,
//             notification: {
//                 title: notificationData.title,
//                 body: notificationData.message,
//                 image: notificationData.image,
//             },
//             data: {
//                 click_action: "FLUTTER_NOTIFICATION_CLICK",
//                 senderId: senderId,
//             },
//         };

//         fcm.send(message, function (err, response) {
//             if (err) {
//                 console.log(err, 1);
//                 throw Error(err);
//             } else {
//                 return response;
//             }
//         });
//     },
// };
