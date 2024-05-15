import express from "express";
import validateToken from "../middleware/validateToken.js";
import { signupTherapist } from "../controllers/therapist.controller.js";
import fs from "fs";
import multer from "multer";

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

export default router;
