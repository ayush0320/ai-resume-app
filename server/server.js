import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectToDB from "./src/config/databse.js";
import {
  resume,
  selfDescription,
  jobDescription,
} from "./src/services/temp.js";

import { generateInterviewReport } from "./src/services/ai.service.js";

connectToDB();

generateInterviewReport(resume, selfDescription, jobDescription)
  .then((report) => {
    console.log("Generated Interview Report:", report);
  })
  .catch((error) => {
    console.error("Error generating interview report:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
