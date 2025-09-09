import mongoose from "mongoose";

const listSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    user:[{
            type: mongoose.Types.ObjectId,
            ref:"User"
    
        }],
},
    {timestamps:true}
);

 const listModel=mongoose.model("List",listSchema);
 export default listModel;