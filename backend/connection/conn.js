import mongoose from "mongoose";

const connectDB=async (databaseurl)=>{
    try {
        await mongoose.connect(databaseurl)
        console.log("DATABASE CONNECTED.....")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB
