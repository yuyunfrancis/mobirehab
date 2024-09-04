import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import AdminService from "../../services/admin.service.js";
import Therapist from "../../models/therapist.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createSuperAdmin = asyncHandler(async (req, res) => {
  console.log("Controller: createSuperAdmin function called");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { savedSuperAdmin, token } = await AdminService.createSuperAdmin(
      email,
      password,
      res
    );

    process.env.ENABLE_SETUP_ROUTES = "false";

    const envFilePath = path.resolve(__dirname, "../../../.env");
    let envFileContent = await fs.promises.readFile(envFilePath, "utf8");
    envFileContent = envFileContent.replace(
      /ENABLE_SETUP_ROUTES=true/,
      "ENABLE_SETUP_ROUTES=false"
    );
    await fs.promises.writeFile(envFilePath, envFileContent);

    res.status(201).json({
      message:
        "Super-admin created successfully. Setup routes are now disabled.",
      adminId: savedSuperAdmin._id,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating super-admin", error: error.message });
  }
});

// create admin account by super admin
export const createAdmin = asyncHandler(async (req, res) => {
  console.log("Controller: createAdmin function called");

  const { email, password } = req.body;
  const creatorId = req.user._id;

  try {
    const newAdmin = await AdminService.createAdmin(creatorId, {
      email,
      password,
    });
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
        createdBy: newAdmin.createdBy,
      },
    });
  } catch (error) {
    if (
      error.message === "Unauthorized: Only super-admin can create an admin"
    ) {
      res.status(403).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error creating admin", error: error.message });
    }
  }
});

// login admin || super-admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await AdminService.loginAdmin({ email, password, res });
    res.status(200).json({
      token: adminData.token,
      data: {
        user: adminData.admin,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all therapists
export const getAllTherapists = async (req, res) => {
  try {
    const admin = req.user;

    if (
      admin.role !== "super-admin" &&
      admin.role !== "admin" &&
      admin.userType !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to access this resource",
      });
    }

    const therapists = await Therapist.find().select("-password");
    res.json({ status: "success", count: therapists.length, data: therapists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Logout admin
 * @param {*} req
 * @param {*} res
 * @returns
 * @description Logout admin
 */

export const logoutAdmin = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get therapist by id
export const getTherapistById = asyncHandler(async (req, res) => {
  try {
    const admin = req.user;
    const therapistId = req.params.id;

    if (
      admin.role !== "super-admin" &&
      admin.role !== "admin" &&
      admin.userType !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to access this resource",
      });
    }

    const therapist = await AdminService.getTherapistDetails(
      admin._id,
      therapistId
    );
    res.json({ status: "success", data: therapist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// approve therapist account by admin
export const approveTherapist = asyncHandler(async (req, res) => {
  try {
    // console.log("Request params:", req.params.id);
    // console.log("Request query:", req.query);
    // console.log("Request body:", req.body);

    const therapistId = req.params.id;
    const adminId = req.user._id;

    // console.log(
    //   `Attempting to approve therapist. TherapistId: ${therapistId}, AdminId: ${adminId}`
    // );

    if (!therapistId) {
      throw new Error("TherapistId is required");
    }

    const updatedTherapist = await AdminService.approveTherapistAccount(
      adminId,
      therapistId,
      req
    );

    // console.log(`Therapist approved successfully: ${updatedTherapist.email}`);

    res.status(200).json({
      success: true,
      message: "Therapist account approved successfully",
      data: {
        therapistId: updatedTherapist._id,
        email: updatedTherapist.email,
        isVerified: updatedTherapist.isVerified,
      },
    });
  } catch (error) {
    // console.error(`Error in approveTherapist: ${error.message}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// deactivate therapist account by admin

export const disapproveTherapist = asyncHandler(async (req, res) => {
  try {
    const therapistId = req.params.id;
    const adminId = req.user._id;

    // console.log(
    //   `Attempting to disapprove therapist. TherapistId: ${therapistId}, AdminId: ${adminId}`
    // );

    if (!therapistId) {
      throw new Error("TherapistId is required");
    }

    const updatedTherapist = await AdminService.deactivateTherapistAccount(
      adminId,
      therapistId
    );

    // console.log(
    //   `Therapist disapproved successfully: ${updatedTherapist.email}`
    // );

    res.status(200).json({
      success: true,
      message: "Therapist account disapproved successfully",
      data: {
        therapistId: updatedTherapist.therapistId,
        email: updatedTherapist.email,
        isVerified: updatedTherapist.isVerified,
      },
    });
  } catch (error) {
    console.error(`Error in disapproveTherapist: ${error.message}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// get a therapist stats
export const getTherapistStats = asyncHandler(async (req, res) => {
  try {
    const adminId = req.user._id;
    const therapistId = req.params.id;

    const stats = await AdminService.getTherapistStatistics(
      adminId,
      therapistId
    );

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(`Error in getTherapistStats: ${error.message}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export const getTherapistAppointments = asyncHandler(async (req, res) => {
  try {
    const { therapistId } = req.params;
    let { page, limit } = req.query;

    // Ensure page and limit are valid numbers
    page = Math.max(1, parseInt(page) || 1);
    limit = Math.max(1, Math.min(100, parseInt(limit) || 10));

    const adminId = req.user._id;

    const result = await AdminService.getTherapistAppointments(
      adminId,
      therapistId,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      message: "Therapist appointments retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in getTherapistAppointments controller:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});
