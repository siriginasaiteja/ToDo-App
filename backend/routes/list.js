import express from 'express'
export const router=express.Router();
import listModel from '../models/list.js';
import userModel from '../models/user.js';

//create
router.post("/addTask",async(req,res)=>{
    try {
        const {title,body,id}=req.body;
        const existingUser=await userModel.findById(id);
        if(existingUser){
            const list=new listModel({title,body,user:existingUser});
            await list.save();
            res.status(200).json({list});
            existingUser.list.push(list);
            existingUser.save();
        }
        else{
            res.status(400).json({message:"Please signup first"});
        }
    } catch (error) {
        console.log(error);
    }
});

//update
router.put("/updateTask/:id",async(req,res)=>{
    try {
        const{title,body}=req.body;
           const list =await listModel.findByIdAndUpdate(req.params.id,{title,body});
            list.save();
            res.status(200).json({message:"task updated"});
        }
     catch (error) {
         console.log(error);

    }
});

//delete
router.delete("/deleteTask/:cardid",async(req,res)=>{
     try {
        const {cardid}=req.params;
        const {id}=req.body;
        const existingUser=await userModel.findByIdAndUpdate(id,{$pull:{list:cardid}});
        if(existingUser){
           await listModel.findByIdAndDelete(cardid);
            res.status(200).json({message:"task deleted"});
        }else{
            res.status(404).json({message:"User not found"});
        }
    } catch (error) {
         console.log(error);
         res.status(500).json({message:"An Error Occurred on the server"});

    }
});

//getTask
router.get("/getTasks/:id",async(req,res)=>{
    
    const list=await listModel.find({user:req.params.id}).sort({createdAt:1});
    if(list.length!==0){
        res.status(200).json({list});
    }
    else{
        res.status(200).json({message:"No Tasks"});
    }
});