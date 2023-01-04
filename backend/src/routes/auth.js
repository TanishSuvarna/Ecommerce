import express  from "express";
const userRouter = express.Router();
import { signUpUser ,signInUser} from "../controller/auth.js";
import {validateSignIn, validateSignUp  } from "../validator/authValidator.js";
import { isValid } from "../validator/commonValidator.js";
userRouter.post("/user/signup" ,validateSignUp , isValid, signUpUser);
userRouter.post("/user/signin" ,validateSignIn , isValid, signInUser);
export default userRouter;