import moment from "moment";
import Availability from "../models/availability.model.js";

class AvailabilityService {
  static async createAvailability(therapistId, dates, availabilityName) {
    const existingAvailabilityName = await Availability.findOne({
      availabilityName: availabilityName,
    });

    if (existingAvailabilityName) {
      throw new Error("The availability name must be unique.");
    }

    const availability = new Availability({
      therapist: therapistId,
      availabilities: dates.map((date) => ({
        date: moment(date.date).startOf("day").toDate(),
        times: date.times.map((time) => ({ time, isActive: true })),
      })),
      availabilityName: availabilityName,
    });

    await availability.save();
    return availability;
  }

  static async getAvailability(therapistId, date) {
    // Convert the input date to the start of the day in UTC
    const searchDateStart = moment.utc(date).startOf("day").toDate();

    // console.log("Therapist ID:", therapistId);
    // console.log("Search Date Start:", searchDateStart);
    // console.log("Query Conditions:", {
    //   therapist: therapistId,
    //   "availabilities.date": {
    //     $gte: searchDateStart,
    //     $lt: moment.utc(searchDateStart).add(1, "days").toDate(),
    //   },
    // });

    const availability = await Availability.findOne({
      therapist: therapistId,
      "availabilities.date": {
        $gte: searchDateStart,
        $lt: moment.utc(searchDateStart).add(1, "days").toDate(),
      },
    });

    if (!availability) {
      return null;
    }

    const therapistAvailability = availability.availabilities.find((a) =>
      moment.utc(a.date).isSame(searchDateStart, "day")
    );

    if (therapistAvailability) {
      return {
        name: availability.availabilityName,
        ...therapistAvailability.toObject(),
      };
    }

    return null;
  }

  // Get all availabilities for a therapist
  static async getAllAvailabilities(therapistId) {
    if (!therapistId) {
      throw new Error("Therapist ID is required");
    }

    try {
      const availabilities = await Availability.find({
        therapist: therapistId,
      });

      if (!availabilities || availabilities.length === 0) {
        return [];
      }

      return availabilities.map((availability) => ({
        id: availability._id,
        name: availability.availabilityName,
        isActive: availability.isActive,
        dates: availability.availabilities.map((a) => ({
          date: a.date,
          times: a.times,
        })),
      }));
    } catch (error) {
      throw new Error("Error fetching availabilities: " + error.message);
    }
  }

  // Update availability time slot status to false (not available) after booking an appointment
  static async updateAvailability(therapistId, date, time) {
    const searchDate = moment(date).startOf("day").toDate();

    const availability = await Availability.findOne({
      therapist: therapistId,
      "availabilities.date": {
        $gte: searchDate,
        $lt: moment(searchDate).endOf("day").toDate(),
      },
    });

    if (availability) {
      const index = availability.availabilities.findIndex(
        (a) =>
          moment(a.date).format("YYYY-MM-DD") ===
          moment(searchDate).format("YYYY-MM-DD")
      );

      if (index !== -1) {
        // Update the specific time slot
        availability.availabilities[index].times = availability.availabilities[
          index
        ].times.map((t) => {
          if (t.time === time) {
            return { time, isActive: false };
          }
          return t;
        });

        // Check if all time slots for this date are now false
        const allSlotsFalse = availability.availabilities[index].times.every(
          (t) => t.isActive === false
        );

        await availability.save();

        return {
          updated: true,
          allSlotsBooked: allSlotsFalse,
        };
      }
    }

    return { updated: false };
  }

  // Therapist can update their availability by adding new time slots, or removing existing ones or changing the availability name, or changing the date
  static async updateMyAvailability(req, id, dates, availabilityName) {
    try {
      const therapistId = req.user._id;

      let availability = await Availability.findOne({
        _id: id,
        therapist: therapistId,
      });

      if (!availability) {
        throw new Error("Availability not found or not authorized");
      }

      if (availabilityName) {
        availability.availabilityName = availabilityName;
      }

      if (dates) {
        availability.availabilities = dates.map((date) => ({
          date: moment(date.date).startOf("day").toDate(),
          times: date.times.map((time) => ({
            time: time.time,
            isActive: time.isActive,
          })),
        }));
      }

      await availability.save();
      return availability;
    } catch (error) {
      console.error("Error updating availability:", error);
      throw error;
    }
  }

  // Set availability to active
  static async setAvailabilityActive(therapistId, availabilityId) {
    // First, set all availabilities for this therapist to inactive
    await Availability.updateMany(
      { therapist: therapistId },
      { isActive: false }
    );

    // Then, set the specified availability to active
    const updatedAvailability = await Availability.findOneAndUpdate(
      { _id: availabilityId, therapist: therapistId },
      { isActive: true },
      { new: true }
    );

    if (!updatedAvailability) {
      throw new Error("Availability not found or not authorized");
    }

    return updatedAvailability;
  }

  static async getActiveAvailability(therapistId) {
    return await Availability.findOne({
      therapist: therapistId,
      isActive: true,
    });
  }

  // Delete availability by ID
  static async deleteAvailability(therapistId, availabilityId) {
    const availability = await Availability.findOneAndDelete({
      _id: availabilityId,
      therapist: therapistId,
    });

    if (!availability) {
      throw new Error("Availability not found or not authorized");
    }

    return availability;
  }
}

export default AvailabilityService;
