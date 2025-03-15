import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const giveUserDetails = asyncHandler( async(req,res) =>{

    // Verify authentication
    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request");
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    const userDetails = {
        "username" : user.username,
        "useremail": user.email,
        "phone": user.phone,
        "totalInvestment": user.totalInvestment,
        "bankBalance": user.bankBalance,
        "annualIncome" : user.annualIncome
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            userDetails,
            "UserDetails fetched succesfully"
        )
    )    
}) 