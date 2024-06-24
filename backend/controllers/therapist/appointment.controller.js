import { asyncHandler } from "../../middleware/asyncHandler.js";
import AppointmentService from "../../services/appointment.service.js";

// Get all appointments for the current user
export const getAppointments = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const therapistId = req.user._id;

  const {
    appointments,
    total,
    page: currentPage,
    limit: currentLimit,
  } = await AppointmentService.findAppointmentsByTherapist(therapistId, {
    page,
    limit,
  });

  res.status(200).json({
    success: true,
    count: appointments.length,
    total,
    page: currentPage,
    limit: currentLimit,
    data: appointments,
  });
});

//get appointment by id

// Fetch appointment details
export const getAppointmentDetails = asyncHandler(async (req, res) => {
  const appointmentId = req.params._id; // Assuming the appointment ID is passed as a URL parameter
  const appointment = await AppointmentService.getAppointmentById(
    appointmentId
  );
  res.status(200).json({
    success: true,
    data: appointment,
  });
});

// update appointment status
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appointmentId = req.params._id;

  const appointment = await AppointmentService.updateAppointmentStatus(
    appointmentId,
    status
  );

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

// delete appointment
export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params._id;
  await AppointmentService.deleteAppointment(appointmentId);

  res.status(200).json({
    success: true,
    data: {},
  });
});
