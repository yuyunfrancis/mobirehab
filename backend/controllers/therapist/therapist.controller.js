import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import Therapist from "../../models/therapist.model.js";
import { uploadFilesToCloudinary } from "../../utils/cloudinary.js";
import { sendEmail } from "../../utils/sendGridEmail.js";
import Patient from "../../models/patient.model.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

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
      specialization,
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
      specialization,
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

    // Send OTP to therapist
    await sendEmail({
      receipientEmail: newTherapist.email,
      subject: "Email Verification Mobirehab",
      req: req,
      template_data: {
        name: firstName,
        otp: otp,
      },
      emailType: "signup ",
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
    return res.redirect("/therapist/login");
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

// get patient details by id

export const getPatientDetails = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ success: "success", data: patient });
  } catch (error) {
    console.error("Error fetching therapist details:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

/**
 * Update therapist profile
 * @route PATCH /api/v1/therapists/profile
 * @access Private
 */
export const updateTherapistProfile = asyncHandler(async (req, res) => {
  const therapist = await Therapist.findById(req.user._id);

  if (!therapist) {
    res.status(404).json({ message: "Therapist not found" });
  }

  const updatableFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "alternativePhoneNumber",
    "gender",
    "profession",
    "bio",
    "numOfYearsOfExperience",
    "specialization",
  ];

  const updates = {};

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  // Handle nested address field
  if (req.body.address) {
    updates.address = {
      ...therapist.address,
      ...req.body.address,
    };
  }

  // Validate specialization if provided
  if (
    updates.specialization &&
    !Therapist.schema
      .path("specialization")
      .enumValues.includes(updates.specialization)
  ) {
    res.status(400).json({ message: "Invalid specialization" });
  }

  Object.assign(therapist, updates);

  //   console.log('Received data:', req.body);
  // console.log('Updates to be applied:', updates);

  const updatedTherapist = await therapist.save();

  res.json({
    message: "Profile updated successfully",
    therapist: {
      id: updatedTherapist._id,
      firstName: updatedTherapist.firstName,
      lastName: updatedTherapist.lastName,
      email: updatedTherapist.email,
      phoneNumber: updatedTherapist.phoneNumber,
      alternativePhoneNumber: updatedTherapist.alternativePhoneNumber,
      gender: updatedTherapist.gender,
      address: updatedTherapist.address,
      profession: updatedTherapist.profession,
      bio: updatedTherapist.bio,
      numOfYearsOfExperience: updatedTherapist.numOfYearsOfExperience,
      specialization: updatedTherapist.specialization,
      licenseNumber: updatedTherapist.licenseNumber,
      profilePicture: updatedTherapist.profilePicture,
      cv: updatedTherapist.cv,
    },
  });
});
