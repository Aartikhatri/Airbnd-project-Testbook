import dotenv from 'dotenv' ;
dotenv.config();
import mongoose from "mongoose";

const DbConnection = async()=>{
    try{
   await mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}` , {
    useUnifiedTopology: true,
    useNewUrlParser: true
   } );
   console.log("connected ");
    }catch(e){
     console.log(e);
    }
};

export default DbConnection;