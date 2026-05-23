function localIsoDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Format for CakePHP datetimepicker fields (mm/dd/yyyy hh:MM tt). */
function formatEventDateTime(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

function daysFromNow(days: number, hour = 10, minute = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function eventStartEnd(
  daysFromToday: number,
  durationHours = 2,
  hour?: number,
  minute?: number,
): {
  start: string;
  end: string;
} {
  const uniqueHour = hour ?? 8 + (new Date().getSeconds() % 10);
  const uniqueMinute = minute ?? new Date().getMinutes() % 60;
  const startDate = daysFromNow(daysFromToday, uniqueHour, uniqueMinute);
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
  return { start: formatEventDateTime(startDate), end: formatEventDateTime(endDate) };
}

export { daysFromNow, eventStartEnd, formatEventDateTime, localIsoDate };
