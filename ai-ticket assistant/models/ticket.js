import mongoose from  "mongoose";

const ticketSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:{type:String,default:"TODO"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    assignedTO:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },
    priority:String,
    Deadline:Date,
    helpfulNotes:String,
    createdAt:{type:Date,default:Date.now},
});
export default mongoose.model("ticket",ticketSchema);