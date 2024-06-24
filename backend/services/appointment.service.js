// appointment.service.js
import Appointment from "../models/appointment.model.js";
import Therapist from "../models/therapist.model.js";
import Patient from "../models/patient.model.js";
import sendEmail from "../utils/sendGridEmail.js";
import { NotFoundError } from "../utils/error.js";

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
  static async updateAppointmentStatus(appointmentId, status) {
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

    return appointment;
  }

  // Delete appointment
  static async deleteAppointment(appointmentId) {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }
    return appointment;
  }
}

export default AppointmentService;
