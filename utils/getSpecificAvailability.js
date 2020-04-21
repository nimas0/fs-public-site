"use strict";

import { Settings as LuxonSettings, DateTime, Interval } from "luxon";

/**
 * @param {number[]} generalTimeAvailability - Array of hours the home is generally available for tours on generally available days
 * @param {number} tourLengthInHours - Owner's tour length preference
 * @param {{ listing: Interval[], user: Interval[] }} schedules - Arrays of start and end times for the listing's and user's existing tour schedules
 * @returns {function(DateTime): number[]} A function that gets the actual availability on a specific date
 */
function getSpecificAvailability(
  generalTimeAvailability,
  tourLengthInHours,
  schedules
) {
  /**
   * @param {DateTime} date - The date being queried
   * @returns {number[]} Array of hours the home is actually available for tours on the specified date, given general availability and already scheduled tours
   */
  function getAvailability(date, log) {
    if (date === null) {
      return [];
    } else {
      LuxonSettings.defaultZoneName = date.zoneName;

      return generalTimeAvailability.filter(h => {
        const startTime = date.startOf("day").set({ hour: h });
        const interval = Interval.after(startTime, {
          hours: Math.floor(tourLengthInHours),
          minutes: (tourLengthInHours % 1) * 60
        });

        // Check against 12-hour lead time
        if (startTime < DateTime.local().plus({ hours: 12 })) {
          return false;
        }

        // Check against listing tour schedule
        if (schedules.listing) {
          for (let tour of schedules.listing) {
            if (interval.overlaps(tour)) {
              return false;
            }
          }
        }

        // Check against user tour schedule
        if (schedules.user) {
          for (let tour of schedules.user) {
            if (interval.overlaps(tour)) {
              return false;
            }
          }
        }

        // If it's passed these checks, the time is available
        return true;
      });
    }
  }
  return getAvailability;
}

export default getSpecificAvailability;
