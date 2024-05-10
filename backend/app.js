import express from "express";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Welcome to MOBIREHAB API"));

//PATIENT ROUTES
app.use("/api/v1/auth", patientRoutes);

export default app;
