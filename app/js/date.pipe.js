// Sem Mes dia

function dateTransform(params) {
  let dateString = params.toString();

  dateString =
    dateString.substring(0, 4) +
    "/" +
    dateString.substring(4, 6) +
    "/" +
    dateString.substring(6, 8);

  return new Date(dateString);
}

export function monthDayTransform(params) {
  let monthNumber = dateTransform(params);
  return monthNumber.getDate();
}

export function weekDayTransform(params) {
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let numberWeekDay = dateTransform(params);

  return weekDay[numberWeekDay.getDay()];
}

export function monthNameTransform(params) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let numberMoth = dateTransform(params);

  return months[numberMoth.getMonth()];
}
