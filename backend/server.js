import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConnection.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB(), console.log(`Server is running on port ${PORT}`);
});
