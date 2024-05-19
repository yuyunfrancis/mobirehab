import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./utils/swaggerOptions.js";
import patientRoutes from "./routes/patient.routes.js";
import therapistRoutes from "./routes/therapist.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Welcome to MOBIREHAB API"));

//PATIENT ROUTES
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/therapist", therapistRoutes);

//Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true })
);

export default app;
