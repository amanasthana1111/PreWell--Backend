import mongoose from "mongoose";

const connectDb =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connection Successfull")
    } catch (error) {
        console.log("Database Connection Faild " + error)
    }
}

export default connectDb;