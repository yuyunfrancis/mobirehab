import express from "express";
import validateToken from "../middleware/validateToken.js";
import {
  getPatientDetails,
  loginTherapist,
  signupTherapist,
  verifyAccount,
} from "../controllers/therapist/therapist.controller.js";
import fs from "fs";
import multer from "multer";
import {
  deleteAppointment,
  getAppointmentDetails,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/therapist/appointment.controller.js";
import {
  createAvailabilityController,
  deleteAvailability,
  getAllAvailabilitiesController,
  getAvailabilityController,
  getMyAvailabilities,
  setAvailabilityActive,
  updateAvailabilityTimeSlot,
  updateMyAvailability,
} from "../controllers/therapist/availability.controller.js";
import Therapist from "../models/therapist.model.js";
import { getTherapistProfileWithRatings } from "../controllers/therapist/common.controller.js";

const dir = "/tmp/my-uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

//ROUTES
const router = express.Router();
router.post(
  "/signup",
  upload.fields([
    { name: "profilePicture" },
    { name: "cv" },
    { name: "licenseDocument" },
  ]),
  signupTherapist
);

router.get("/verify-email", verifyAccount);
router.post("/login", loginTherapist);

router.use(validateToken);
router.route("/appointments").get(getAppointments);
router
  .route("/appointments/:_id")
  .get(getAppointmentDetails)
  .patch(updateAppointmentStatus)
  .delete(deleteAppointment);
router
  .route("/availability")
  .get(getAvailabilityController)
  .post(createAvailabilityController);

router
  .route("/availability/:id")
  .get(getAllAvailabilitiesController)
  .put(updateAvailabilityTimeSlot);
router.get("/my-availability", getMyAvailabilities);
router
  .route("/my-availability/:id")
  .patch(updateMyAvailability)
  .delete(deleteAvailability);
router.put("/my-availability/:availabilityId/activate", setAvailabilityActive);

// get patient
router.get("/patient/:id", getPatientDetails);
router.get("/profile", getTherapistProfileWithRatings);


export default router;
