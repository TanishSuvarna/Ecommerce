import { Router } from "express";
import { isAdmin, isSignedIn, isUser } from "../common_middleware/middleware.js";
import { createProduct, getProduct } from "../controller/product.js";
import { isValid } from "../validator/commonValidator.js";
import { validateProduct } from "../validator/productValidator.js";
import { upload } from "../common_middleware/middleware.js";
const productRouter = Router();

productRouter.post("/product/create" , isSignedIn , isAdmin , validateProduct ,isValid ,upload.array("productImages"),createProduct);
productRouter.get("/product" ,isSignedIn, isUser ,validateProduct , isValid ,  getProduct);

export default productRouter;