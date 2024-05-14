import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    cloudinaryId: {
      type: String,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    guardianPhoneNumber: {
      type: String,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    userType: {
      type: String,
      default: "patient",
    },
  },
  { timesstamps: true }
);

patientSchema.pre("save", function (next) {
  if (!this.patientId) {
    this.patientId = generatePatientId();
  }
  next();
});

function generatePatientId() {
  let id = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < 6; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
