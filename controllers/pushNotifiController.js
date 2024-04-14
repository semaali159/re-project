const admin = require("firebase-admin");
const asynchandler = require("express-async-handler");
const cron = require("node-cron");
const schedule = require("node-schedule");
const { Medicin } = require("../model/medicine");
const serviceAccount = require("../test.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectID: "testt - 24942",
});

const sendPushNotification = async (req, res) => {
  try {
    const registrationToken = req.body.token;
    const medicin = await Medicin.findById(req.params.id);
    console.log(medicin.EnableNotification);
    const flag = medicin.EnableNotification;
    const messaging = admin.messaging();

    console.log(flag);
    if (flag) {
      const message = {
        notification: {
          title: "اشعاراااات  حبييييب",
          body: "اشعار من سمى حوول",
        },
        data: {
          score: "850",
          time: "2:45",
        },
        token: registrationToken,
      };
      // `0 */${repeat} * * *`
      const repeat = 24 / medicin.repeat;
      console.log(repeat);
      cron.schedule(
        `*/${repeat}  * * * *`,
        async () => {
          console.log(repeat);
          console.log("Running a job at 01:00 at America/Sao_Paulo timezone");

          await messaging.send(message);
          // .then((response) => {
          //   // Response is a message ID string.
          //   console.log("Successfully sent message:", response);
          //   return res
          //     .status(200)
          //     .json({ message: "successfully", response });
          // })
          // .catch((error) => {
          //   console.log("Error sending message:", error);
          // });
        },
        {
          scheduled: true,
          timezone: "America/Sao_Paulo",
        }
      );
    }
    return res.status(200).json({ message: "sucess" });
  } catch (e) {
    res.status(400).json({ message: e.message, success: false });
  }
};

module.exports = sendPushNotification;
