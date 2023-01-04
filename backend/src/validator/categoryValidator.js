import {check} from 'express-validator'


//Adding Validation For Duplicate Names


export const validateCategoryName = [
    check("name")
    .notEmpty()
    .withMessage("Category Name Is Required")
]

