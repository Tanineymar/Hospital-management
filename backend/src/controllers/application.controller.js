
import applicationModel from "../models/application.model.js";

async function applicationController(req, res) {
    try {
        const { applyingFor, specialization, licenseNumber, qualification, department } = req.body

        if (req.user.role !== "patient") {
            return res.status(400).json(
                { message: `You are already a ${req.user.role}. Cannot apply again` });
        }

        const isPending = await applicationModel.findOne({
            user: req.user._id,
            status: 'pending'
        })

        if (isPending) {
            return res.status(400).json({
                message: "You application is pending. Please wait for admin review."
            })
        }

        const application = await applicationModel.create({
            user: req.user._id,
            applyingFor,
            specialization,
            licenseNumber,
            qualification,
            department,

        });

        const populatedApplication = await applicationModel
        .findById(application._id)
        .populate("user" , 'name email')

        res.status(200).json({
            message: `Application submitted for ${applyingFor} role. Please wait for admin approval.`,
            application : populatedApplication,
        })
    } catch (error) {
        console.log("Application error", error)
        res.status(500).json({
            message: "Application failed",
            error: error.message
        })
    }
}


export default { applicationController }