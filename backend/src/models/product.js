import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    productImages:[{
        img:{
            type:String
        }
    }],
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    offers:[{
        description : {
            type:String
        }
    }],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    updatedAt:{
        type:Date
    },
    reviews:[{
        user : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        description:{
            type:String
        }
    }]


},{timestamps:true})



export default  mongoose.model("Product" , productSchema);