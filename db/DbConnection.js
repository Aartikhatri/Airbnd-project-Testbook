
import mongoose from "mongoose";

const DbConnection = async(url , Dname)=>{
    console.log("ooooo");
    try{
   await mongoose.connect(`${url}${Dname}` , {
    useUnifiedTopology: true,
    useNewUrlParser: true
   } );
   console.log("connected ");
    }catch(e){
     console.log(e);
    }
};

export default DbConnection;