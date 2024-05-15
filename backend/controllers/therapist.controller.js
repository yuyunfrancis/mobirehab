import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Therapist from "../models/therapist.model.js";
import { uploadFilesToCloudinary } from "../utils/cloudinary.js";
import multer from "multer";
const upload = multer();

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
      password,
      //   confirmPassword,
    } = req.body;

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // }

    const therapistByEmail = await Therapist.findOne({ email });
    const therapistByPhone = await Therapist.findOne({ phoneNumber });

    if (therapistByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (therapistByPhone) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

    const files = [
      {
        filePath: profilePicture.path,
        folderName: "therapistProfilePictures",
      },
      { filePath: cv.path, folderName: "therapistCVs" },
      {
        filePath: licenseDocument.path,
        folderName: "therapistLicenseDocuments",
      },
    ];

    const uploadResults = await uploadFilesToCloudinary(files);

    const newTherapist = new Therapist({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      profession,
      bio,
      licenseNumber,
      password: hashedPassword,
      profilePicture: uploadResults[0].secure_url,
      cv: uploadResults[1].secure_url,
      licenseDocument: uploadResults[2].secure_url,
    });

    if (newTherapist) {
      generateToken(newTherapist._id, newTherapist.userType, res);
      await newTherapist.save();

      res
        .status(201)
        .json({ message: "Therapist created successfully", newTherapist });
    } else {
      res.status(400).json({ message: "Therapist creation failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
