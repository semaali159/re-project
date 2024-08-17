function calculateReminderTimes(startDate, endDate, repeat) {
  const reminderTimes = [];
  const duration = endDate - startDate;
  const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
  const intervalHours = 24 / repeat;

  for (let day = 0; day <= days; day++) {
    for (let i = 0; i < repeat; i++) {
      const reminderTime = new Date(startDate);
      reminderTime.setHours(startDate.getHours() + i * intervalHours);
      reminderTime.setDate(startDate.getDate() + day);
      if (reminderTime <= endDate) {
        reminderTimes.push(reminderTime);
      }
    }
  }

  return reminderTimes;
}
module.exports = calculateReminderTimes;
