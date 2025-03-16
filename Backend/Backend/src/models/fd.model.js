import mongoose, { Schema } from "mongoose";

const FDSchema = new Schema({
    userId :{
        type: Schema.Types.ObjectId,
    },
    age: {
        type: Number,
    },
    fullName: {
        type: String,
    },
    depositAmount:{
        type: Number,
    },
    purchaseDate:{
        type: Date,
    },
    tenure: {
        type: Number,
    }
},{timestaps: true})

export const FD = mongoose.model("FD",FDSchema)