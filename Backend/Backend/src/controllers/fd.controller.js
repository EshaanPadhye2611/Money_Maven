import { FD } from "../models/fd.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const fdForm = asyncHandler(async (req, res) => {
    const { age, fullName, depositAmount, tenure } = req.body;
    try {
        const newFD = new FD({
            userId: req.user._id,
            age,
            fullName,
            depositAmount,
            purchaseDate: new Date(),
            tenure,
        });
        await newFD.save();
        res.status(201).json(newFD);
        console.log("fd added successfully");
    } catch (e) {
        console.log(e);
    }
});

export const getFD = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const FDs = await FD.find({ userId: userId });

    const activeFDs = FDs.filter(fd => {
        const endDate = new Date(fd.purchaseDate);
        endDate.setFullYear(endDate.getFullYear() + fd.tenure);
        return endDate > new Date();
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            activeFDs,
            "active fds fetched successfully"
        )
    );
});