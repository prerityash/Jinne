import mongoose from "mongoose";

//this is subschema we use in interviewReportSchema
const technicalQuestionsSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: [true, "Technical questions is required"]
    },
    intention: {
        type: String,
        required: [true, "Technical questions is required"]
    },
    answer: {
        type: String,
        required: [true, "Technical questions is required"]
    }
}, {
    _id: false
})

//this is subschema we use in interviewReportSchema
const behavioralQuestionsSchema = new mongoose.Schema({
    questions: {
        type: String,
        required: [true, "Technical questions is required"]
    },
    intention: {
        type: String,
        required: [true, "Technical questions is required"]
    },
    answer: {
        type: String,
        required: [true, "Technical questions is required"]
    }

}, {
    _id: false
})

//this is subschema we use in interviewReportSchema
const skillgapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "skills are required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity score is required"]
    },
}, {
    _id: false
})

//this is subschema we use in interviewReportSchema
const preparationplanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required field"]
    },
    focus: {
        type: String,
        required: [true, "focus is required field"]
    },
    task: {
        type: String,
        required: [true, "focus is required field"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
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
    //here we are using the subschema made above
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillgaps: [skillgapsSchema],
    preparationplan: [preparationplanSchema]
}, {
    timestamps: true,
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

export default interviewReportModel;