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

    // const accessToken = jwt.sign(
    //     {
    //         _id: user._id,
    //         role: user.role,
    //         email: user.email,
    //         name: user.name,
    //     }, 
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    // );
    
    const userDetails = {
        "username" : user.username,
        "email": user.email,
        "phone": user.phone,
        "totalInvestment": user.totalInvestment,
        "bankBalance": user.bankBalance,
        "annualIncome" : user.annualIncome

    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            userDetails,
            "UserDetails fetched succesfully"
        )
    )    
}) 