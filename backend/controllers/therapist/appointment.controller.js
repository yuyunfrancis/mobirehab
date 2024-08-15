import { asyncHandler } from "../../middleware/asyncHandler.js";
import AppointmentService from "../../services/appointment.service.js";
import { ForbiddenError } from "../../utils/error.js";

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
  const appointmentId = req.params._id;
  const userId = req.user._id;
  const userType = req.user.userType;

  const appointment = await AppointmentService.getAppointmentById(appointmentId);

  // Check if the user is authorized to view the appointment
  let isAuthorized = false;

  if (userType === 'patient') {
    isAuthorized = appointment.patient.toString() === userId.toString();
  } else if (userType === 'therapist') {
    isAuthorized = appointment.therapist.toString() === userId.toString();
  }

  if (!isAuthorized) {
    throw new ForbiddenError('You do not have permission to view this appointment');
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});



// update appointment status
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appointmentId = req.params._id;

  const result = await AppointmentService.updateAppointmentStatus(
    appointmentId,
    status,
    req
  );

  const response = {
    success: true,
    data: result.appointment,
  };

  if (result.patientEmailResponse) {
    response.emailSent = true;
    response.emailResponse = result.patientEmailResponse;
  }

  res.status(200).json(response);
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


// Get upcoming appointments for the current user (patient or therapist)
export const getUpcomingAppointments = asyncHandler(async (req, res) => {
 try {

  const userId = req.user._id;
  const userType = req.user.userType;

  const appointments = await AppointmentService.upcomingAppointments(userId, userType);

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
 }catch(err){
   console.error(err);
  res.status(500).json({
    success: false,
    message: "Server error",
 })

  }
}
);



