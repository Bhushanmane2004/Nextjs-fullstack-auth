import mongoose, { connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export async function connect() {
    try {
       
    
        
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongo connected sucessfully");
        });
        connection.on('error',(err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
        
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
       
    }
}