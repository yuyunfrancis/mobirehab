import express from "express";
import {
  loginPatient,
  logoutPatient,
  signupPatient,
} from "../controllers/patients.controller.js";

//ROUTES
const router = express.Router();

router.post("/signup", signupPatient);
router.get("/login", loginPatient);
router.get("/logout", logoutPatient);

export default router;
