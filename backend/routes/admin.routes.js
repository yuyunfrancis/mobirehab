import express from "express";
import { checkSetupKey } from "../middleware/checkSetupKey.js";
import { checkPasswordStrength } from "../middleware/checkPasswordStrength.js";
import {
  approveTherapist,
  createAdmin,
  createSuperAdmin,
  disapproveTherapist,
  getAllTherapists,
  getTherapistById,
  loginAdmin,
} from "../controllers/admin/admin.controller.js";
import validateToken from "../middleware/validateToken.js";
import { checkRouteIsEnabled } from "../middleware/checkRouteIsEnabled.js";
import { setupLimiter } from "../utils/setUpLimiter.js";

const router = express.Router();

// Public route for creating super admin
router
  .route("/setup/create-super-admin")
  .post(
    checkRouteIsEnabled,
    checkSetupKey,
    checkPasswordStrength,
    createSuperAdmin
  );

// login admin route
router.route("/login").post(setupLimiter, loginAdmin);

// Protected admin routes
router.use(validateToken);
router.route("/create").post(checkPasswordStrength, createAdmin);
router.route("/therapists").get(getAllTherapists);
router.route("/therapists/:id").get(getTherapistById);
router.route("/herapist/approve/:id").patch(approveTherapist);
router.route("/all-therapist/disapprove/:id").patch(disapproveTherapist);

export default router;
