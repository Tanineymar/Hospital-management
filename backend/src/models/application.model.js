import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    applyingFor: {
        type: String,
        enum: ["doctor", "lab staff"],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

    // Doctor feild
    specialization: { type: String, },
    licenseNumber: { type: String, },
    qualification: { type: String },

    // Lab staff feild
    department: {
        type: String,
        enum: ['Pathology', 'Radiology', 'Microbiology', 'Biochemestry', 'Cardiology', 'Histopathology'],
        required: true
    },

}, { timestamps: true })

const applicationModel = mongoose.model("Application", applicationSchema)

export default applicationModel