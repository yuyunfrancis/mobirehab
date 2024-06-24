import bcrypt from "bcryptjs";
import Patient from "../../models/patient.model.js";
import generateToken from "../../utils/generateToken.js";

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id, user.userType, res);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signupPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      guardianPhoneNumber,
      gender,
      address,
      password,
      dateOfBirth,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (phoneNumber === guardianPhoneNumber) {
      return res.status(400).json({
        message:
          "Guardian phone number cannot be the same as patient phone number",
      });
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
      address,
      dateOfBirth,
      password: hashedPassword,
    });

    if (newPatient) {
      await newPatient.save();
      const user = await Patient.findById(newPatient._id).select("-password");
      createSendToken(user, 201, res);
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
  try {
    const { email, phoneNumber, password } = req.body;

    const patient = await Patient.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    const isPasswordValid = await bcrypt.compare(
      password,
      patient?.password || ""
    );

    if (!patient || !isPasswordValid) {
      return res.status(400).json({
        message:
          "Invalid login patient credentials. Please check your credentials",
      });
    }

    const user = await Patient.findById(patient._id).select("-password");
    createSendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutPatient = (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Patient logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
