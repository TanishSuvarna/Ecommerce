import { Router } from "express";
import { isAdmin, isSignedIn, isUser } from "../common_middleware/middleware.js";
import { addToCart } from "../controller/cart.js";
const cartRouter = Router();

cartRouter.post("/user/cart/add" , isSignedIn , isUser , addToCart);
// cartRouter.get("/category" ,isSignedIn, isUser, getCategory);

export default cartRouter;