import express from "express";
import {
  getAllTherapists,
  getTherapistDetails,
  loginPatient,
  logoutPatient,
  signupPatient,
  tokenValidation,
} from "../controllers/patient/patients.controller.js";
import validateToken from "../middleware/validateToken.js";
import {
  createAppointment,
  getAppointments,
} from "../controllers/patient/appointment.controller.js";

//ROUTES
const router = express.Router();

router.post("/signup", signupPatient);
router.post("/login", loginPatient);

router.use(validateToken);
router.route("/appointments").get(getAppointments).post(createAppointment);
router.get("/payment-success-page", (req, res) => {
  res.send("Payment successful and appointment updated!");
});
router.route("/therapists").get(getAllTherapists);
router.get("/therapist/:id", getTherapistDetails);
router.get("/profile", (req, res) => {
  res.json(req.user);
});
router.post("/logout", logoutPatient);

export default router;
