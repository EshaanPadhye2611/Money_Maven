import mongoose, { Schema } from "mongoose";

const InsuranceSchema = new Schema({
    userId :{
        type: Schema.Types.ObjectId,
    },
    age: {
        type: Number,
    },
    purchaseDate:{
        type: Date,
    },
    annualIncome: {
        type: Number,
    },
    insuranceName:{
        type: String
    },
    coverageAmount:{
        type: Number,
    },
    aadhaarNumber: {
        type: Number,
    },
    policyType: {
        type: String,
        enum: ["Term Life", "Whole Life", "Health","Auto","Travel","Property",] 
    },
    tenure: {
        type: Number,
    }
},{timestaps: true})

export const Insurance = mongoose.model("Insurance",InsuranceSchema)