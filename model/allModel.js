import mongoose from "mongoose";

const registrationSchema =  new mongoose.Schema({
    country : {type:String , trim: true , required: true},
    number : {type:Number , trim: true , required: true},
    name : {type:String , trim: true , required: true},
    email : {type:String , trim: true , required: true},
    password : {type:String , trim: true , required: true},
})

const setYourPlaceSchema = new mongoose.Schema({

     location: {type:String , trim: true , required: true},
    area : {type:String , trim: true , required: true},
    date : {type:String , trim: true , required: true},
    price: {type:Number , trim: true},
    hostby :  {type:String , trim: true , required: true},
    villaName :  {type:String , trim: true , required: true},
    image : {type : String }
})

const staticImage = new mongoose.Schema({
    staticImg : { type : String }
})

const registrationModel = new mongoose.model('registrationData' , registrationSchema);
const setYourPlaceModel = new mongoose.model('placeDetailsData' , setYourPlaceSchema);
const staticImageModel = new mongoose.model('StaicWebImg' , staticImage )

export {registrationModel , setYourPlaceModel , staticImageModel};