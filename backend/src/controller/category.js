import Category from "../models/category.js";
import slugify from 'slugify'
export const createCategory = async (req,res,next) => {
    const categoryInfo = {
        name : req.body.name,
        slug : slugify(req.body.name),
        parentID : req.body.parentID,
        categoryImage : req.file ? process.env.API + "/public" + "/" + req.file.filename : null
    }
    try{
        const newCategory = new Category(categoryInfo);
        await newCategory.save();
        return res.status(201).json({message:`Category ${newCategory.name} is successfully added`});
    }catch{() => {return res.status(400).json({message : "Something Went Wrong Please Try Again"})}};
}

const getAllCategoriesOrdered = (allCategories , parent) => {
    let temp = allCategories.filter((singleCat) => {
        return (singleCat.parentID === parent)|| (!singleCat.parentID && !parent);
    });
    
    for(let i = 0 ; i < temp.length ;i++){
        temp[i] ={ _id : temp[i]._id , 
                name : temp[i].name , 
                slug : temp[i].slug , 
                createdAt:temp[i].createdAt ,
                updatedAt :temp[i].updatedAt   ,
                children : getAllCategoriesOrdered(allCategories , (temp[i]._id).toString())}
        }
    return temp;
}
export const getCategory = async (req,res,next) => {
    const allCategories =await Category.find({});
    let orderedCategories = getAllCategoriesOrdered(allCategories , null);
    return res.status(201).json({orderedCategories});
}