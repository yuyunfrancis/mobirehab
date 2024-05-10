import bcrypt from "bcryptjs";
import Patient from "../models/patient.model.js";
import generateToken from "../utils/generateToken.js";

export const signupPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      guardianPhoneNumber,
      gender,
      country,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const patientByEmail = await Patient.findOne({ email });
    const patientByPhone = await Patient.findOne({ phoneNumber });

    if (patientByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (patientByPhone) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    // HashPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      phoneNumber,
      guardianPhoneNumber,
      gender,
      country,
      password: hashedPassword,
    });

    if (newPatient) {
      // generate jwt token
      generateToken(newPatient._id, res);
      await newPatient.save();

      res
        .status(201)
        .json({ message: "Patient created successfully", newPatient });
    } else {
      res
        .status(400)
        .json({ message: "Patient not created, Invalid patient data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginPatient = async (req, res) => {
  console.log("Login patient");
};

export const logoutPatient = async (req, res) => {
  console.log("Logout patient");
};
