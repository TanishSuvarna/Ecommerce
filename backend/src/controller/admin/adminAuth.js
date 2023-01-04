import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/user.js'
import {nanoid} from 'nanoid'
const generateJWTToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
};
export const signUpAdmin = async(req,res,next) => {
        const {firstName ,
                lastName ,
                email ,
                address,
                password ,
                contactNo,
                profilePicture,
        } = req.body;
    //  if(!firstName || !lastName || !username || !email || !password || !address) return res.status(500).json({message:"Enter Valid Details"});
     const userExists = await User.findOne({email});
     if(userExists){
        return res.status(400).json({message:"User Already Exists"});
    }  
    
     else{
        try{
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS) ,async(err , hash) => {
            if(err) return res.status(500).json({message:"Something Went Wrong"});
            let newUser,hash_password;
            hash_password = hash;
            const role = "admin";
            newUser = new User({firstName ,
                                    lastName ,
                                    username :nanoid() + firstName,
                                    email,
                                    hash_password,
                                    contactNo,
                                    profilePicture,
                                    address,
                                    role}) 
                                    
            const savedUser = await newUser.save();
            const token = generateJWTToken(savedUser._id, savedUser.role);
            const { _id,fullName } = savedUser;
            if(!savedUser) return res.status(400).json({message:"Something Went Wrong ! Please try again"});
            return res.status(201).json({token , user : { _id, firstName, lastName, email, role, fullName}});
        }
        );
        }catch{(err) => {return res.status(500).json({message:err})}};
     } 

}

export const signInAdmin= async (req,res,next) =>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const isPassword = await user.authenticate(password);
        if(isPassword && user.role == 'admin' || user.role == 'superAdmin'){
            const { _id, firstName, lastName, email, role, fullName }  = user;
            const token =  generateJWTToken(user._id , user.role);
            if(token){
                res.status(201).json({token , user : { _id, firstName, lastName, email, role, fullName }});
            }
            else{
                return res.status(500).json({message:"Something Went Wrong"});
            }
        } 
        else{
            return res.status(404).json({message:"Please Enter A Valid Password"});
        }
    }
    else{
        return res.status(400).json({message:"User Does Not Exist"});
    }
}