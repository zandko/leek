import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

// Extend dayjs with necessary plugins
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Get the current formatted time in a specified timezone.
 *
 * This function returns the current time formatted according to the specified format
 * in the given timezone. Defaults to `Asia/Shanghai` for the timezone and
 * `hh:mmA dddd, MMMM D, YYYY` for the format if not provided.
 *
 * @param {string} [tz='Asia/Shanghai'] - The timezone to use (e.g., "Asia/Shanghai", "UTC").
 * @param {string} [format='hh:mmA dddd, MMMM D, YYYY'] - The format string for the date and time.
 * Uses Day.js formatting rules.
 * @returns {string} - The formatted current time in the specified timezone and format.
 */
export function getCurrentFormattedTime(tz = 'Asia/Shanghai', format: string = 'hh:mmA dddd, MMMM D, YYYY'): string {
  const now = dayjs().tz(tz);
  return now.format(format);
}
