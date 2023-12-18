import mongoose, {ConnectOptions} from "mongoose";
import { env } from "process";

let isConnected:boolean  = false
export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if(!process.env.MONGO_URI){
        return console.error("MONGO_URI is not defined")
    }
    if (isConnected) {
        return;
    }
    try {
        const options:ConnectOptions = {
            dbName: "twitter",
            autoCreate: true,
        };
        await mongoose.connect(process.env.MONGO_URI, options)
        isConnected = true
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error connecting to MongoDB: ");
    }
}
