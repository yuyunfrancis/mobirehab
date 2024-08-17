import Admin from "../models/admin.model.js";
import generateToken from "../utils/generateToken.js";

class AdminService {
  static async createSuperAdmin(email, password, res) {
    try {
      const existingSuperAdmin = await Admin.findOne({ role: "super-admin" });
      if (existingSuperAdmin) {
        throw new Error("Super admin already exists");
      }

      const superAdmin = new Admin({
        email,
        password,
        role: "super-admin",
        userType: "admin",
      });

      const savedSuperAdmin = await superAdmin.save();

      const token = generateToken(
        savedSuperAdmin._id,
        savedSuperAdmin.userType,
        res
      );

      console.log(`Super admin created successfully: ${savedSuperAdmin.email}`);

      return { savedSuperAdmin, token };
    } catch (error) {
      console.log("Error in AdminService.createSuperAdmin", error);
      throw error;
    }
  }

  // create an Admin by a super admin
  static async createAdmin(creatorId, newAdminData) {
    try {
      // Find the creator (should be a super admin)
      const creator = await Admin.findById(creatorId);
      if (!creator || creator.role !== "super-admin") {
        throw new Error("Unauthorized: Only super-admin can create an admin");
      }

      const { email, password } = newAdminData;

      const admin = new Admin({
        email,
        password,
        role: "admin",
        userType: "admin",
        createdBy: creatorId,
      });

      const savedAdmin = await admin.save();

      console.log(`Admin created successfully: ${savedAdmin.email}`);

      return savedAdmin;
    } catch (error) {
      console.log("Error in AdminService.createAdmin", error);
      throw error;
    }
  }

  // login admin || super-admin
  static async loginAdmin({ email, password, res }) {
    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error(
          "admin not found. Please check your email and password"
        );
      }

      // Check if the account is locked
      if (admin.lockUntil && admin.lockUntil > Date.now()) {
        const waitTime = Math.ceil((admin.lockUntil - Date.now()) / 1000 / 60);
        throw new Error(
          `Account is locked. Please try again after ${waitTime} minutes.`
        );
      }

      const isPasswordValid = await admin.matchPassword(password);

      if (!isPasswordValid) {
        // Increment login attempts
        await admin.incrementLoginAttempts();

        console.log("Login attemps", admin.loginAttempts);

        if (admin.loginAttempts >= 5) {
          const lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
          await Admin.updateOne({ _id: admin._id }, { lockUntil: lockUntil });
          throw new Error(
            "Too many failed attempts. Account locked for 30 minutes."
          );
        }

        throw new Error(
          "Invalid login credentials. Please check your credentials"
        );
      }

      // Reset login attempts on successful login
      await Admin.updateOne(
        { _id: admin._id },
        {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 },
        }
      );

      // Update last login
      await Admin.updateOne({ _id: admin._id }, { lastLogin: new Date() });

      // Generate token
      const token = generateToken(admin._id, admin.userType, res);

      return {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        token: token,
      };
    } catch (error) {
      console.log("Error in AdminService.loginAdmin", error);
      throw error;
    }
  }
}

export default AdminService;
