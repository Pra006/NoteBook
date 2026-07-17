import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cors from "cors";

import signupRoute from "./routes/userRoute.js";
import loginRoute from "./routes/userRoute.js";
import noteRoute from  "./routes/noteRoute.js"
import adminRoute from "./routes/adminRoute.js"

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use("/api/user", signupRoute);
app.use("/api/user", loginRoute);
app.use("/api", noteRoute)
app.use("/api", adminRoute)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})