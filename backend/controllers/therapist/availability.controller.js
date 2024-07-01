import { asyncHandler } from "../../middleware/asyncHandler.js";
import AvailabilityService from "../../services/availability.service.js";

export const createAvailabilityController = async (req, res) => {
  try {
    const therapistId = req.user._id;
    const userType = req.user.userType;

    if (userType !== "therapist") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { date, times, availabilityName } = req.body;

    if (!date || !times || !availabilityName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const availability = await AvailabilityService.createAvailability(
      therapistId,
      date,
      times,
      availabilityName
    );

    return res
      .status(201)
      .json({ status: "success", availability: availability });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating availability", error: error.message });
  }
};

export const getAvailabilityController = async (req, res) => {
  const { therapistId, date } = req.query;

  // Validation
  if (!therapistId || !date) {
    return res
      .status(400)
      .json({ error: "Missing therapistId or date in query parameters." });
  }

  try {
    const availability = await AvailabilityService.getAvailability(
      therapistId,
      date
    );

    return res.status(200).json({ status: "success", availability });
  } catch (error) {
    if (error.type === "NotFoundError") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getAllAvailabilitiesController = async (req, res) => {
  // Use the 'id' parameter from the route
  const therapistId = req.params.id;

  try {
    const activeAvailability = await AvailabilityService.getActiveAvailability(
      therapistId
    );

    if (!activeAvailability) {
      return res
        .status(404)
        .json({ message: "No active availability found for this therapist" });
    }

    return res.status(200).json({
      status: "success",
      activeAvailability: activeAvailability,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching active availability",
      error: error.message,
    });
  }
};

// get my availabilities
export const getMyAvailabilities = asyncHandler(async (req, res) => {
  try {
    if (req.user.userType !== "therapist") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const therapistId = req.user._id;

    const availabilities = await AvailabilityService.getAllAvailabilities(
      therapistId
    );

    res.status(200).json({
      success: true,
      data: availabilities,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update my availability
export const updateMyAvailability = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.userType !== "therapist") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { availabilityName, date, times } = req.body;

    // Check if at least one field is provided for update
    if (!availabilityName && !date && !times) {
      return res.status(400).json({
        message:
          "At least one field (availabilityName, date, or times) is required for update",
      });
    }

    const updatedAvailability = await AvailabilityService.updateMyAvailability(
      req,
      id,
      date,
      times,
      availabilityName
    );

    res.status(200).json({
      message: "Availability updated successfully",
      availability: updatedAvailability,
    });
  } catch (error) {
    console.error("Error in updateAvailability controller:", error);
    if (error.message === "Availability not found or not authorized") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Failed to update availability" });
    }
  }
});

// Update date andtime availability for therapist when a patient books an appointment, change time slot status to false and if all times are booked, show no availability
export const updateAvailabilityTimeSlot = async (req, res) => {
  try {
    const { id } = req.params; // This is the therapist ID
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const result = await AvailabilityService.updateAvailability(id, date, time);

    if (result.updated) {
      const message = result.allSlotsBooked
        ? "Time slot updated. All slots for this date are now booked."
        : "Time slot updated successfully.";

      res.status(200).json({ message, allSlotsBooked: result.allSlotsBooked });
    } else {
      res
        .status(404)
        .json({ message: "Availability not found for the given date" });
    }
  } catch (error) {
    console.error("Error updating availability:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating availability" });
  }
};

export const setAvailabilityActive = asyncHandler(async (req, res) => {
  try {
    if (req.user.userType !== "therapist") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const therapistId = req.user._id;
    const { availabilityId } = req.params;

    const activeAvailability = await AvailabilityService.setAvailabilityActive(
      therapistId,
      availabilityId
    );

    res.status(200).json({
      message: "Availability set as active successfully",
      availability: activeAvailability,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to set availability as active",
      error: error.message,
    });
  }
});
