import express from "express";
import {
  loginPatient,
  logoutPatient,
  signupPatient,
} from "../controllers/patients.controller.js";
import validateToken from "../middleware/validateToken.js";

//ROUTES
const router = express.Router();

router.post("/signup", signupPatient);
router.post("/login", loginPatient);
router.post("/logout", logoutPatient);

router.use(validateToken);
router.get("/profile", (req, res) => {
  res.json(req.user);
});

export default router;
