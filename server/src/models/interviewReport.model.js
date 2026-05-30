import mongoose from "mongoose";

/*
* job descript schema : String
* resume text : String
* self description : String
* matchScore : Number

* technical questions : 
[{
    question : "",
    intention : "",
    feedback : ""
}]
* behavioral questions : 
[{
    question : "",
    intention : "",
    feedback : ""
}]
* skill gaps : [{
    skills : "",
    severity : "",
    type : String, // technical or behavioral
    enum : ["low", "medium", "high"]
}]
* preparation plan : [{
    day : Number,
    focus : String,
    tasks : [String]
}]
*/

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
    },
  },
  {
    _id: false, // Disable _id for subdocuments
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
    },
  },
  {
    _id: false, // Disable _id for subdocuments
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      required: [true, "Severity is required"],
      enum: ["low", "medium", "high"],
    },
  },
  {
    _id: false, // Disable _id for subdocuments
  },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: {
      type: [String],
      required: [true, "Tasks are required"],
    },
  },
  {
    _id: false, // Disable _id for subdocuments
  },
);

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestionSchema: [technicalQuestionSchema],
  behavioralQuestionSchema: [behavioralQuestionSchema],
  skillGapSchema: [skillGapSchema],
  preparationPlanSchema: [preparationPlanSchema],
});

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

export default interviewReportModel;
