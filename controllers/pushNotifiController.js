const admin = require("firebase-admin");
const asynchandler = require("express-async-handler");
const cron = require("node-cron");
const schedule = require("node-schedule");
const { Medicin } = require("../model/medicine");
const serviceAccount = require("../test.json");
// const serviceAccount = require("../tests.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectID: "testt - 24942",
});

const sendPushNotification = async (req, res) => {
  try {
    const currentTime = Date.now();
    const date = new Date(currentTime);
    const registrationToken = req.body.token;
    const medicin = await Medicin.findById(req.params.id);
    console.log(medicin.EnableNotification);
    const flag = medicin.EnableNotification;
    const messaging = admin.messaging();

    console.log(flag);
    if (flag) {
      const message = {
        notification: {
          title: "Enaya",
          body: ` please take ${medicin.medicinName}`,
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
      task = cron.schedule(
        `0 */${repeat} * * *`,
        async () => {
          if (date < medicin.endDate) {
            await messaging.send(message).then((response) => {
              console.log(`cron function executed at ${date}`);
            });

            console.log(repeat);
            console.log(medicin.endDate);
            console.log(`cron function executed at ${date}`);
          } else {
            console.log("wee");
            task.destroy();
          }
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
