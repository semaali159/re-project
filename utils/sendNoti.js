const cron = require("node-cron");
const { Medicin } = require("../model/medicine");
const { Elderly } = require("../model/elderly");
const { Activity } = require("../model/activity");
var admin = require("firebase-admin");

var serviceAccount = require("../s.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendNotification(fcmToken, title, body) {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return true;
  } catch (error) {
    console.log("Error sending message:", error);
    if (
      error.errorInfo.code === "messaging/registration-token-not-registered"
    ) {
      console.log("Invalid FCM token:", fcmToken);
    }
    return false;
  }
}

async function scheduleMedicinNotifications() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    console.log("Current Time:", now);

    const medicines = await Medicin.aggregate([
      { $match: { EnableNotification: true } },
      { $unwind: "$reminderTimes" },
      {
        $project: {
          elderly: 1,
          medicinName: 1,
          reminderTimes: 1,
          date: {
            $dateToString: { format: "%Y-%m-%d %H:%M", date: "$reminderTimes" },
          },
        },
      },
      {
        $match: {
          date: { $lte: now.toISOString().slice(0, 16) },
        },
      },
    ]);

    for (const medicin of medicines) {
      const elderly = await Elderly.findById(medicin.elderly);

      if (elderly && elderly.fcmToken && elderly.fcmToken.length > 0) {
        const title = `Reminder for ${medicin.medicinName}`;
        const body = `It's time to take your medication: ${medicin.medicinName}`;

        let notificationSent = false;

        for (const token of elderly.fcmToken) {
          const success = await sendNotification(token, title, body);
          if (success) {
            notificationSent = true;
            console.log("Sending notification to token:", token);
          }
        }

        if (notificationSent) {
          await Medicin.updateOne(
            { _id: medicin._id },
            { $pull: { reminderTimes: medicin.reminderTimes } }
          );
        }
      }
    }
  });
}

async function scheduleActivityNotifications() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    console.log("Current Time:", now);

    const activities = await Activity.aggregate([
      { $match: { EnableNotification: true } },
      { $unwind: "$reminderTimes" },
      {
        $project: {
          elderly: 1,
          activityName: 1,
          reminderTimes: 1,
          date: {
            $dateToString: { format: "%Y-%m-%d %H:%M", date: "$reminderTimes" },
          },
        },
      },
      {
        $match: {
          date: { $lte: now.toISOString().slice(0, 16) },
        },
      },
    ]);

    for (const activity of activities) {
      const elderly = await Elderly.findById(activity.elderly);

      if (elderly && elderly.fcmToken && elderly.fcmToken.length > 0) {
        const title = `Reminder for ${activity.activityName}`;
        const body = `It's time for your activity: ${activity.activityName}`;

        let notificationSent = false;

        for (const token of elderly.fcmToken) {
          const success = await sendNotification(token, title, body);
          if (success) {
            notificationSent = true;
            console.log("Sending notification to token:", token);
          }
        }

        if (notificationSent) {
          await Activity.updateOne(
            { _id: activity._id },
            { $pull: { reminderTimes: activity.reminderTimes } }
          );
        }
      }
    }
  });
}

module.exports = {
  scheduleMedicinNotifications,
  scheduleActivityNotifications,
};
