import userModel from "../models/user.model.js";
import applicationModel from "../models/application.model.js";



// fetched pendind application

async function getPendingApplications(req, res) {

    try {
        const applications = await applicationModel
            .find({ status: 'pending' })
            .populate('user', 'name email')
            .sort({ createdAt: -1 })

        res.status(200).json({
            message: "pending applications fetched successfully.",
            count: applications.length, applications
        })
    } catch (error) {
        res.status(500).json({
            message: "Error to fetch pending applications.",
            error: error.message
        })
    }

}

// approved pending applications

async function approveApplication(req, res) {
    try {
       const department = req.body?.department

        const application = await applicationModel
            .findById(req.params.id)
            .populate('user')

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            })
        }
        if (application.status !== 'pending') {
            return res.status(400).json({
                message: 'Application already processed.'
            })
        }

        application.status = 'approved'
        await application.save()

         await userModel.findByIdAndUpdate(application.user._id, {
            role: application.applyingFor,
            department: department,
            status: "active"
        })

     

        res.status(200).json({
            message: `${application.user.name} approved as ${application.applyingFor}. They must re-login`
        })


    } catch (error) {
        res.status(500).json({
            message: 'Application error', error: error.message
        });
    }
}

// Reject application

async function rejectApplication(req ,res) {
    try {
        
        const application = await applicationModel
        .findById(req.params.id)
        .populate('user')

        if(!application){
            return res.status(404).json({
                message:"Application not found."
            })
        }
        
        if(application.status !== 'pending'){
            return res.status(401).json({
                message:"Application already processed."
            })
        }

        application.status = 'rejected'
        await application.save()

        await userModel.findByIdAndUpdate(application.user._id, {
            role:application.applyingFor
        })

        res.status(200).json({
            message:`${application.user.name} application rejected for ${application.applyingFor}`
        })

    } catch (error) {
        res.status(500).json({
            message:"Application error", 
            error:error.message
        })
    }
    
}




export default {getPendingApplications , approveApplication , rejectApplication}