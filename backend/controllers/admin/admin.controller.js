import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import AdminService from "../../services/admin.service.js";
import { log } from "console";

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
    res.json(adminData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
