import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined", "Done", "Cancelled"],
    default: "Pending",
  },
  service: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
    // maxlength: 1000,
  },
  payment: {
    amount: {
      type: Number,
      required: true,
      default: 5000, // 5,000 Rwf
    },
    method: {
      type: String,
      default: "MTN MoMo",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

appointmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
