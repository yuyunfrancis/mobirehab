import Appointment from "../models/appointment.model.js";
import Therapist from "../models/therapist.model.js";
import Patient from "../models/patient.model.js";
import sendEmail from "../utils/sendGridEmail.js";
// import paymentGateway from "../utils/paymentGateway.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { therapist, date, time, service, purpose, payment } = req.body;
    const patientId = req.user._id;

    // Check if the therapist exists
    const existingTherapist = await Therapist.findById(therapist);
    if (!existingTherapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }

    // Check if the payment details are provided
    // if (!payment) {
    //   return res.status(400).json({ error: "Payment details are required" });
    // }

    // // Validate the payment
    // const paymentResponse = await paymentGateway.validatePayment(payment);
    // if (!paymentResponse.success) {
    //   return res.status(400).json({ error: paymentResponse.message });
    // }

    // Update the payment.isPaid field to true
    // payment.isPaid = true;

    // Create a new appointment
    const newAppointment = new Appointment({
      patient: patientId,
      therapist,
      date,
      time,
      service,
      purpose,
      payment,
    });

    // Save the new appointment to the database
    const savedAppointment = await newAppointment.save();

    // Fetch patient and therapist details
    const patientDetails = await Patient.findById(patientId);
    const therapistDetails = await Therapist.findById(therapist);

    // For patient
    const patientEmailData = {
      recipientEmail: patientDetails.email,
      subject: "Appointment Confirmation",
      template_data: {
        name: `${patientDetails.firstName} ${patientDetails.lastName}`,
        therapistName: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
        date: savedAppointment.date.toDateString(),
        time: savedAppointment.time,
        status: savedAppointment.status,
      },
      req,
      emailType: "appointment_patient",
    };

    // For therapist
    const therapistEmailData = {
      recipientEmail: therapistDetails.email,
      subject: "New Appointment Notification",
      template_data: {
        name: `${therapistDetails.firstName} ${therapistDetails.lastName}`,
        patientName: `${patientDetails.firstName} ${patientDetails.lastName}`,
        date: savedAppointment.date.toDateString(),
        time: savedAppointment.time,
        service: savedAppointment.service,
        purpose: savedAppointment.purpose,
        status: savedAppointment.status,
      },
      req,
      emailType: "appointment_therapist",
    };

    const patientEmailResponse = await sendEmail(patientEmailData);
    const therapistEmailResponse = await sendEmail(therapistEmailData);

    res.status(201).json({
      appointment: savedAppointment,
      patientEmailResponse,
      therapistEmailResponse,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
