import {check, validationResult} from "express-validator";
import users from "../../repositories/users.js";

export default {
    requireEmail:
        check("email").trim().normalizeEmail().isEmail().withMessage("Invalid email")
            .custom(async (email)=>{
            const foundUser = await users.filter({"email":email});
            if (foundUser){
                return Promise.reject("This email is already used")
            }
            else {
                return true;
            }
        }),
    requirePassword:
        check("password").trim().isLength({min:8, max:20}).withMessage("must be 8-20 characters")
            .custom((password,{req})=>{
            if (password !== req.body["passwordConfirm"]){
                return Promise.reject("Passwords don't match")
            }
            else {
                return true;
            }
    }),
    emailExists:
        check("email").trim().isEmail().withMessage("Must be a valid email")
        .custom (async email=>{
            const user = await users.filter({email});
            if(!user){
                await Promise.reject("No user with these credentials");
            }
            else {
                return true;
            }
        }),
    validPassword:
        check("password").trim().
        custom(async (password, {req})=>{
            const user = await users.filter({email:req.body.email});
            if(!user){return Promise.reject("")}
            if(await users.comparePasswords(user["password"],password) === false){
                return Promise.reject("Invalid password");
            }
            else{
                return true;
            }
        }),
    checkTitle:
        check("title").trim().isLength({min:5, max:40}).withMessage("Too short or too long title"),
    checkPrice:
        check("price").toFloat().isFloat({min:1}).withMessage("Price must be a number"),
    checkCount:
        check("count").toInt().isInt({min:0}).withMessage("Count must be an integer number"),
    checkRating:
        check("rating").toFloat().isFloat({min:1, max:5}).withMessage("Rating should be between 1 and 5"),
}

