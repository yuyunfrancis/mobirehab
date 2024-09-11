// appointment.service.js
import Appointment from "../models/appointment.model.js";
import Therapist from "../models/therapist.model.js";
import Patient from "../models/patient.model.js";
import { sendEmail } from "../utils/sendGridEmail.js";
import { NotFoundError } from "../utils/error.js";
import SessionNote from "../models/sessionNotes.model.js";

class AppointmentService {
  // Create a new appointment
  static async createAppointment({
    therapist,
    date,
    time,
    service,
    purpose,
    payment,
    patientId,
  }) {
    const existingTherapist = await Therapist.findById(therapist);
    if (!existingTherapist) {
      throw new Error("Therapist not found");
    }

    const newAppointment = new Appointment({
      patient: patientId,
      therapist,
      date,
      time,
      service,
      purpose,
      payment,
    });

    const savedAppointment = await newAppointment.save();

    const patientDetails = await Patient.findById(patientId);
    const therapistDetails = await Therapist.findById(therapist);

    const patientEmailData = this.getPatientEmailData(
      patientDetails,
      therapistDetails,
      savedAppointment
    );
    const therapistEmailData = this.getTherapistEmailData(
      patientDetails,
      therapistDetails,
      savedAppointment
    );

    const patientEmailResponse = await sendEmail(patientEmailData);
    const therapistEmailResponse = await sendEmail(therapistEmailData);

    return {
      appointment: savedAppointment,
      patientEmailResponse,
      therapistEmailResponse,
    };
  }

  static getPatientEmailData(patientDetails, therapistDetails, appointment) {
    return {
      recipientEmail: patientDetails.email,
      subject: "Appointment Confirmation",
      template_data: {
        name: `${patientDetails.firstName} ${patientDetails.lastName}`,
        therapistName: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
        date: appointment.date.toDateString(),
        time: appointment.time,
        status: appointment.status,
      },
      emailType: "appointment_patient",
    };
  }

  static getTherapistEmailData(patientDetails, therapistDetails, appointment) {
    return {
      recipientEmail: therapistDetails.email,
      subject: "New Appointment Notification",
      template_data: {
        name: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
        patientName: `${patientDetails.firstName} ${patientDetails.lastName}`,
        date: appointment.date.toDateString(),
        time: appointment.time,
        service: appointment.service,
        purpose: appointment.purpose,
        status: appointment.status,
      },
      emailType: "appointment_therapist",
    };
  }

  // Find appointments for a patient
  static async findAppointmentsByPatient(
    patientId,
    { page = 1, limit = 10 } = {}
  ) {
    const patientExists = await Patient.findById(patientId);
    if (!patientExists) {
      throw new NotFoundError("Patient not found");
    }

    const skip = (page - 1) * limit;
    const appointments = await Appointment.find({ patient: patientId })
      .limit(limit)
      .skip(skip);
    const total = await Appointment.countDocuments({ patient: patientId });

    return { appointments, total, page, limit };
  }

  // Find appointments for a therapist
  static async findAppointmentsByTherapist(
    therapistId,
    { page = 1, limit = 10 } = {}
  ) {
    const therapistExists = await Therapist.findById(therapistId);
    if (!therapistExists) {
      throw new NotFoundError("Therapist not found");
    }

    const skip = (page - 1) * limit;
    const appointments = await Appointment.find({ therapist: therapistId })
      .limit(limit)
      .skip(skip);
    const total = await Appointment.countDocuments({ therapist: therapistId });

    return { appointments, total, page, limit };
  }

  // Fetch appointment by ID
  static async getAppointmentById(appointmentId) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    return appointment;
  }

  // Update appointment status
  // static async updateAppointmentStatus(appointmentId, status) {
  //   const appointment = await Appointment.findById(appointmentId);
  //   if (!appointment) {
  //     throw new NotFoundError("Appointment not found");
  //   }
  //   const validStatuses = [
  //     "Pending",
  //     "Accepted",
  //     "Declined",
  //     "Done",
  //     "Cancelled",
  //   ];

  //   if (!validStatuses.includes(status)) {
  //     throw new Error("Invalid status");
  //   }

  //   appointment.status = status;
  //   await appointment.save();

  // // send email to patient after appointment status is updated
  //   const patientDetails = await Patient.findById(appointment.patient);
  //   const therapistDetails = await Therapist.findById(appointment.therapist);

  //   const patientEmailData = {
  //     recipientEmail: patientDetails.email,
  //     subject: "Appointment Status Update",
  //     template_data: {
  //       name: `${patientDetails.firstName} ${patientDetails.lastName}`,
  //       therapistName: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
  //       date: appointment.date.toDateString(),
  //       time: appointment.time,
  //       status: appointment.status,
  //       appointmentId: appointment._id,
  //     },
  //     emailType: "appointment_status_update",
  //   };

  //   const patientEmailResponse = await sendEmail(patientEmailData);

  //   return { appointment, patientEmailResponse };

  // }

  static async updateAppointmentStatus(appointmentId, status, req) {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    const validStatuses = [
      "Pending",
      "Accepted",
      "Declined",
      "Done",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    appointment.status = status;
    await appointment.save();

    // Only send email for Accepted or Declined statuses
    if (status === "Accepted" || status === "Declined") {
      const patientDetails = await Patient.findById(appointment.patient);
      const therapistDetails = await Therapist.findById(appointment.therapist);

      const patientEmailData = {
        recipientEmail: patientDetails.email,
        subject: `Appointment ${status}: ${therapistDetails.firstName} ${therapistDetails.lastName}`,
        template_data: {
          name: `${patientDetails.firstName} ${patientDetails.lastName}`,
          therapistName: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
          date: appointment.date.toDateString(),
          time: appointment.time,
          status: status,
          appointmentId: appointment._id,
          message:
            status === "Accepted"
              ? "Your appointment has been accepted by the therapist."
              : "Unfortunately, your appointment has been declined by the therapist.",
        },
        emailType: "appointment_status_update",
        req,
      };

      const patientEmailResponse = await sendEmail(patientEmailData);
      return { appointment, patientEmailResponse };
    }

    return { appointment };
  }

  // Delete appointment
  static async deleteAppointment(appointmentId) {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }
    return appointment;
  }

  // Patient rescheduling an appointment with a therapist. This function is to allow patient to reschedule an appointment with a therapist by updating the appointment details.
  // This is valid on for 48 hours after appointment have been booked...after 48 hours appointment can't be rescheduled.
  static async rescheduleAppointment(appointmentId, newDate, newTime) {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);
    const timeDifference = currentDate - appointmentDate;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference > 48) {
      throw new Error("Appointment cannot be rescheduled after 48 hours");
    }

    appointment.date = newDate;
    appointment.time = newTime;
    appointment.status = "Pending";

    try {
      await appointment.save();
      return appointment;
    } catch (error) {
      console.error("Error saving appointment:", error);
      throw new Error("Failed to save rescheduled appointment");
    }
  }

  // Cancel an appointment. An apppointment can either be cancelled by patient or therapist.

  // Getting upcoming appointments for a therapist || patient
  static async upcomingAppointments(userId, userType) {
    const query =
      userType === "patient" ? { patient: userId } : { therapist: userId };
    const appointments = await Appointment.find({
      ...query,
      date: { $gte: new Date() },
      status: "Accepted",
    })
      .sort({ date: 1 })
      .populate("patient", "firstName lastName")
      .populate("therapist", "firstName lastName specialization");

    return appointments;
  }

  // Add appointment notes during an appointment. This function is to allow therapist to add notes during an appointment with a patient.
  static async addAppointmentNotes(appointmentId, notes) {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    const sessionNotes = new SessionNote({
      appointment: appointmentId,
      reason: notes.reason,
      note: notes.note,
    });

    await sessionNotes.save();

    appointment.sessionNotes.push(sessionNotes._id);

    await appointment.save();
    return appointment;
  }
}

export default AppointmentService;
