import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required:true
    },
    price:{
        type :Number,
        required:true,
    },
    quantity:{
        type : Number,
        required:true
    }

},{timestamps:true}
)


export default  mongoose.model("Cart" , cartSchema);