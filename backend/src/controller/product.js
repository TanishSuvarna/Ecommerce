
import slugify from "slugify";
import Product from "../models/product.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
export const createProduct = (req,res,next) => {
    const   {name ,
            category ,
            description ,
            price ,
            quantity ,
        } = req.body;   
    const productImages = req.files.map(file => {
        return {img : process.env.API + "/public" + "/" + file.filename};
    });    
    const productInfo = {
        name,
        slug : nanoid() + '-' + slugify(name),
        category : mongoose.Types.ObjectId(category),
        description,
        price,
        quantity,
        productImages,
        createdBy : req.user._id,
    }
    const newProduct = new Product(productInfo);
    newProduct.save((err , savedProduct) => {
        if(err){
            return res.status(500).json({message:err})
        }
        else{
            return res.status(201).json({newProduct , files : req.files});
        }
    })
}

export const getProduct = (req,res,next) => {

}