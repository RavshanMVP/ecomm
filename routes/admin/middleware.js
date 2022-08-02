import {validationResult, check} from "express-validator"
import validators from "./validators.js";

export default {
    handleErrors(templateFunc, dataCB){
        return async (req, res, next) =>{

            const errors = validationResult(req);
            if (!errors.isEmpty()){
                let data={};
                if (dataCB){
                    data = await dataCB(req);
                }
                return res.send(templateFunc({errors, ...data}));
            }
            next();
        }
    },
    checkAuthentication(req, res, next) {
        if (!req.session.userID) {
            return res.redirect("/signin");
        }
        next();
    }
}