import mongoose from "mongoose"
const questionSchema = new mongoose.Schema({
    title:String,
    body:String,
    tags:[],
    created_at: {
        type:Date,
        default:Date.now()
    },
    user:Object,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
})

export default mongoose.model("Question",questionSchema)