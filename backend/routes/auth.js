import express from 'express'
export const router=express.Router();
import userModel from '../models/user.js';
import listModel from '../models/list.js';
import bcrypt from 'bcryptjs';

//sign-Up
router.post("/register",async(req,res)=>{
  try {
        const { email, username, password } = req.body;

        // 1. Check if the username is already taken
        const existingUsername = await userModel.findOne({ username: username });
        if (existingUsername) {
            // Use a 409 Conflict status for a duplicate resource
            return res.status(409).json({ message: "Username is already taken" });
        }

        // 2. Check if the email is already in use
        const existingEmail = await userModel.findOne({ email: email });
        if (existingEmail) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        // 3. Use async hashing (better for performance)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, username, password: hashedPassword });
        await newUser.save();

        // 4. Send a 201 Created status for a successful creation
        res.status(201).json({ message: "Sign up successful" });

    } catch (error) {
        // This will catch any other unexpected errors
        console.error(error);
        res.status(500).json({ message: "Server error during registration" });
    }
});

//Sign-In
router.post("/login",async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email});
        if(!user){
          res.status(200).json({ message:"Please SignUP First"});
        }
        const isPasswordCorrect=bcrypt.compareSync(req.body.password,user.password);
         if(!isPasswordCorrect){
          res.status(200).json({ message:"Password is not correct"});
        }
        const {password,...others}=user._doc;
        res.status(200).json({others});

    } catch (error) {
        res.status(400).json({ message:"An internal server error occurred."});
    }
});

router.delete("/deleteAcc/:id",async(req,res)=>{
    const {id}=req.params;
       try {
       await listModel.deleteMany({ user: id });
      await userModel.findByIdAndDelete(id);
       res.status(200).json({message:"Account deleted"});
       } catch (error) {
    // 1. Log the actual error to your server's console
    console.error("Error deleting account:", error);

    // 2. Send a 500 Internal Server Error status code
    res.status(500).json({ message: "An error occurred while deleting the account." });
}
})
