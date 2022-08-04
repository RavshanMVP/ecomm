import express from "express";
import users from "../../repositories/users.js";
import signup from "../../views/admin/auth/signup.js";
import signin from "../../views/admin/auth/signin.js";
import validator from "./validators.js";
import middleware from "./middleware.js";
const router = express.Router();


router.get("/signup", (req, res)=> {
    res.send(signup());
})

router.get("/signout", (req, res)=>{
    req.session = null;
    res.redirect("/");
})

router.post("/signout", (req, res)=>{
    req.session = null;
    res.redirect("/");
})

router.get("/signin", (req, res)=>{
    res.send(signin())
})

router.post("/signin",
    [validator.emailExists, validator.validPassword],
    middleware.handleErrors(signin),
    async (req, res)=>{
    const {email} =req.body;

    const user = await users.filter({email});
    req.session["userID"] = user["id"];
    res.redirect("/");

})

router.post("/signup",
    [validator.requireEmail, validator.requirePassword,],
    middleware.handleErrors(signup),
    async (req, res)=> {
        const {email, password} = req.body;

        const user = await users.create({email, password});
        req.session["userID"] = user["id"];
        res.redirect("/");
    }
)

export default router;