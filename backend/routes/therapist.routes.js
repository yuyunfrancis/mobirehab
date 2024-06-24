import express from "express";
import validateToken from "../middleware/validateToken.js";
import {
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
router.get("/profile", (req, res) => {
  res.json(req.user);
});

export default router;
