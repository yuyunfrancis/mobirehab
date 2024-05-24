import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Therapist from "../models/therapist.model.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import sendEmail from "../utils/sendGridEmail.js";

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

export const signupTherapist = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      profession,
      bio,
      licenseNumber,
      numOfYearsOfExperience,
      password,
      confirmPassword,
    } = req.body;

    // Check if email or phone number is already in use
    const therapistByEmail = await Therapist.findOne({ email });
    const therapistByPhone = await Therapist.findOne({ phoneNumber });

    if (therapistByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (therapistByPhone) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check for required files
    const profilePicture = req.files.profilePicture
      ? req.files.profilePicture[0]
      : undefined;
    const cv = req.files.cv ? req.files.cv[0] : undefined;
    const licenseDocument = req.files.licenseDocument
      ? req.files.licenseDocument[0]
      : undefined;

    if (!profilePicture || !cv || !licenseDocument) {
      return res
        .status(400)
        .json({ message: "Please upload all required files" });
    }

    // Upload files to Cloudinary
    const files = [
      { filePath: profilePicture.path, folderName: "therapistProfilePictures" },
      { filePath: cv.path, folderName: "therapistCVs" },
      {
        filePath: licenseDocument.path,
        folderName: "therapistLicenseDocuments",
      },
    ];

    const uploadResults = await uploadFilesToCloudinary(files);

    // Create new therapist
    const newTherapist = await Therapist.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      profession,
      bio,
      licenseNumber,
      numOfYearsOfExperience,
      password: hashedPassword,
      profilePicture: uploadResults[0].secure_url,
      cv: uploadResults[1].secure_url,
      licenseDocument: uploadResults[2].secure_url,
      active: false,
      otp: null,
      otpExpires: null,
    });

    // Generate OTP
    const otp = await newTherapist.createOTP();
    await newTherapist.save({ validateBeforeSave: false });
    console.log("OTP", otp);

    // Send OTP to therapist
    await sendEmail({
      receipientEmail: email,
      subject: "Email Verification Mobirehab",
      req: req,
      template_data: {
        name: firstName,
        otp: otp,
      },
    });

    res.json({
      status: "success",
      message: `OTP sent to ${email}`,
      user: newTherapist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { otp } = req.query;
    const therapist = await Therapist.findOne({
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!therapist) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    therapist.active = true;
    therapist.otp = null;
    therapist.otpExpires = null;

    await therapist.save();
    return res.redirect("therapist/success");
  } catch (e) {
    console.log(e);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Login therapist

export const loginTherapist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check if therapist exists
    const therapist = await Therapist.findOne({ email }).select("+password");
    if (!therapist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await therapist.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check if therapist account is verified
    if (!therapist.active) {
      return res.status(400).json({
        message:
          "Account is not active. Please make sure your email is verified",
      });
    }

    createSendToken(therapist, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
