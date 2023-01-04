import { Router } from "express";
import { isAdmin, isSignedIn, isUser } from "../common_middleware/middleware.js";
import { createCategory, getCategory } from "../controller/category.js";
import { validateCategoryName} from "../validator/categoryValidator.js";
import { isValid } from "../validator/commonValidator.js";
import { upload } from "../common_middleware/middleware.js";
const categoryRouter = Router();

categoryRouter.post("/category/create" , isSignedIn , isAdmin ,upload.single("categoryImage") ,validateCategoryName , isValid , createCategory);
categoryRouter.get("/category" ,isSignedIn, isUser, getCategory);

export default categoryRouter;