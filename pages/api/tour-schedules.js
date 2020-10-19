"use strict";

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseInit from "../../utils/firebaseInit";
import {
  parseJSON,
  addMinutes,
  addHours,
  subHours,
  areIntervalsOverlapping
} from "date-fns";

firebaseInit();

export default async (req, res) => {
  /// Check current listing and/or user schedules
  if (req.method === "GET") {
    const { listingId = null, userId = null } = req.query;
    const showings = firebase.firestore().collection("showings");

    // Get listing's future tour schedule
    const listingScheduleCheck = listingId
      ? new Promise(async (resolve, reject) => {
        try {
          const futureTours = await showings
            .where("listingId", "==", listingId)
            .orderBy("scheduled")
            .startAt(firebase.firestore.Timestamp.now())
            .get();

          // Format array to just `start` and `durationInMinutes` fields and
          // remove canceled listings
          let scheduleArray = [];
          futureTours.forEach(tour => {
            if (tour.status === "pending" || tour.status === "approved") {
              const start = tour.get("scheduled").toDate();
              const durationInMinutes = tour.get("duration");
              scheduleArray.push({ start, durationInMinutes });
            }
          });

          return resolve(scheduleArray);
        } catch (err) {
          return reject(err);
        }
      })
      : null;

    // Get user's future tour schedule
    const userScheduleCheck = userId
      ? new Promise(async (resolve, reject) => {
        try {
          const futureTours = await showings
            .where("buyerUserId", "==", userId)
            .orderBy("scheduled")
            .startAt(firebase.firestore.Timestamp.now())
            .get();

          // Format array to just `start` and `durationInMinutes` fields and
          // remove canceled listings
          let scheduleArray = [];
          futureTours.forEach(tour => {
            if (tour.status === "pending" || tour.status === "approved") {
              const start = tour.get("scheduled").toDate();
              const durationInMinutes = tour.get("duration");
              scheduleArray.push({ start, durationInMinutes });
            }
          });

          return resolve(scheduleArray);
        } catch (err) {
          return reject(err);
        }
      })
      : null;

    try {
      // Resolve both checks
      const [listingSchedule, userSchedule] = await Promise.all([
        listingScheduleCheck,
        userScheduleCheck
      ]);

      // If no rejections, return schedules
      return res.status(200).json({
        ...(listingSchedule && { listingSchedule }),
        ...(userSchedule && { userSchedule })
      });
    } catch (err) {
      console.log(err);
      const { response } = err;
      if (response) {
        return res
          .status(response.status)
          .json({ message: response.statusText });
      } else {
        // 503 Service Unavailable
        return res.status(503).json({ message: err.message });
      }
    }
  }

  /// Schedule a new tour
  else if (req.method === "POST") {
    const {
      startTime: startTimeJSON,
      durationInMinutes,
      listingId,
      userId,
      user
    } = req.body;
    const startTime = parseJSON(startTimeJSON);
    const endTime = addMinutes(startTime, durationInMinutes);

    // Connect to showings collection in database
    const showings = firebase.firestore().collection("showings");

    // Check for listing tour conflicts
    const listingToursCheck = new Promise(async (resolve, reject) => {
      try {
        // Get subset of tours within 12-hour radius
        const listingToursToCheck = await showings
          .where("listingId", "==", listingId)
          .orderBy("scheduled")
          .startAt(subHours(startTime, 12))
          .endBefore(addHours(startTime, 12))
          .get();

        // Check each tour for overlap with requested tour
        let listingConflict = false;
        for (let tour of listingToursToCheck.docs) {
          if (tour.status === "pending" || tour.status === "approved") {
            const tourStartTime = tour.get("startTime").toDate();
            const tourEndTime = tourStartTime.addMinutes(tour.get("duration"));
            if (
              areIntervalsOverlapping(
                { start: startTime, end: endTime },
                { start: tourStartTime, end: tourEndTime }
              )
            ) {
              listingConflict = true;
              return reject({ listingConflict });
            }
          }
        }
        return resolve({ listingConflict });
      } catch (err) {
        return reject(err);
      }
    });

    // Check for user tour conflicts
    const userToursCheck = new Promise(async (resolve, reject) => {
      try {
        // Get subset of tours within 12-hour radius
        const userToursToCheck = await showings
          .where("buyerUserId", "==", userId)
          .orderBy("scheduled")
          .startAt(subHours(startTime, 12))
          .endBefore(addHours(startTime, 12))
          .get();

        // Check each tour for overlap with requested tour
        let userConflict = false;
        for (let tour of userToursToCheck.docs) {
          if (tour.status === "pending" || tour.status === "approved") {
            const tourStartTime = tour.get("startTime").toDate();
            const tourEndTime = tourStartTime.addMinutes(tour.get("duration"));
            if (
              areIntervalsOverlapping(
                { start: startTime, end: endTime },
                { start: tourStartTime, end: tourEndTime }
              )
            ) {
              userConflict = true;
              return reject({ userConflict });
            }
          }
        }
        return resolve({ userConflict });
      } catch (err) {
        return reject(err);
      }
    });

    try {
      // Resolve both checks
      await Promise.all([userToursCheck, listingToursCheck]);

      // If no rejections, add new tour to database
      await showings.add({
        listingId,
        buyerUserId: userId,
        buyerUser: user,
        scheduled: startTime,
        duration: durationInMinutes,
        status: "pending",
        dateCreated: new Date()
      });

      // If no error, mission accomplished
      return res.status(200).json({ message: "Tour scheduled!" });
    } catch (err) {
      if (err.userConflict) {
        // Return user conflict response
        return res.status(409).json({
          userConflict: true,
          message:
            "Sorry, this time conflicts with a tour you just scheduled in another window."
        });
      }

      if (err.listingConflict) {
        // Return listing conflict response
        return res.status(409).json({
          listingConflict: true,
          message:
            "Sorry, this time conflicts with a tour that was just scheduled for this home."
        });
      }

      console.error(err);
      const { response } = err;
      if (response) {
        return res
          .status(response.status)
          .json({ message: response.statusText });
      } else {
        // 503 Service Unavailable
        return res.status(503).json({ message: err.message });
      }
    }
  }
};
