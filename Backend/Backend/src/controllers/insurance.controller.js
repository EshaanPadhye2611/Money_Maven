import { Insurance } from "../models/insurance.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const insuranceForm = asyncHandler(async(req,res)=>{

    const {age, annualIncome, coverageAmount, aadhaarNumber, policyType, tenure} = req.body;

    const newInsurance = new Insurance({
        userId: req.user._id,
        age, 
        purchaseDate: new Date(),
        annualIncome,
        coverageAmount,
        aadhaarNumber,
        policyType,
        tenure
    });
    await newInsurance.save();
    res.status(201).json(newInsurance);

})


export const getInsurance = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const insurances = await Insurance.find({ userId: userId });

    const activeInsurances = insurances.filter(insurance => {
        const endDate = new Date(insurance.purchaseDate);
        endDate.setFullYear(endDate.getFullYear() + insurance.tenure);
        return endDate > new Date();
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            activeInsurances,
            "active fds fetched successfully"
        )
    );
});