import User from "../models/user.js";
import Cart from "../models/cart.js";


// const doc = await Story.findOne({ title: 'Casino Royale' }).populate('fans');
// console.log(doc.getPopulatedDocs()); /List of all `fans` documents

const saveUser = (res,user) => user.save((err , savedDoc) => {
    if(err){
        return res.status(500).json({message:"Something Went Wrong ! Please Try Again Later"});
    }
    else{
        return res.status(201).json({savedDoc , message:"Product Added Succesfully"});
    }
})
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        let check = await callback(array[index]);
        if(check) break;
    }
};
export const addToCart = async (req,res,next) => {
    const { productID , price , quantity} = req.body;
    const user = await User.findOne({_id : req.user._id}).populate("cart");
    let exists = false;
    await asyncForEach(user.cart ,async (p) => {
        if(productID === p.product.toString()){
            await Cart.findOneAndUpdate({_id : p._id} , { _id : p._id, product : productID , price :parseInt(price), quantity : p.quantity+parseInt(quantity)});
            exists = true;
        }
        return exists;
    });
    if(exists === false){
        const newProductPurchase = new Cart({
            product : productID , price :parseInt(price), quantity : parseInt(quantity)
        })
        newProductPurchase.save((err , savedProduct) => {
            if(err){
                return res.status(500).json({message:"Something Went Wrong PLease Try Again Laterdddd"});
            }
            user.cart.push(savedProduct);
            saveUser(res,user);
        }) 
    }
    else{
        return res.status(201).json({message:"Product Added Successfully"});
    }       
}


