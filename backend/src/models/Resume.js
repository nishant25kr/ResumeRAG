import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    text: { 
        type: String,
        required: false
    },       
    embedding: { 
        type: [Number], 
        required: true 
    }, 
    metadata: {
        filename: String,
        uploadedAt: { 
            type: Date, 
            default: Date.now 
        },
    },
    status: {
        type: String,
        enum: ["pending", "processing", "ready", "failed"],
        default: "ready"
    },
    skills: {
        type: [String],
        default: []
    },
    isSortlisted:{
        type:Boolean,
        default:false
    },
    pdfPath: String, 

    
});


export default mongoose.model("Resume", ResumeSchema)