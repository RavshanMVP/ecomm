import express from "express";
import list from "../views/products/list.js";
import product from "../views/products/product.js";
import productsRep from "../repositories/products.js";
import users from "../repositories/users.js";
import middleware from "./admin/middleware.js";

const router = express.Router();
let message;
router.get("/", async (req, res) => {
    const products = await productsRep.getAll();
    req.session.search = null;
    console.log(req.session.userID);
    res.send(list({products}))
})

router.post("/products/:id", async (req, res) => {
    const prod = await productsRep.getOne(req.params.id);
    res.send(product({product:prod}));
})

router.get("/products/:id", async (req, res) => {
    const prod = await productsRep.getOne(req.params.id);
    res.send(product({product:prod, message}));
})

router.post("/products/:id/rate", async (req, res) => {

    const prod = await productsRep.getOne(req.params.id);
    if(!req.session.userID){
        return res.send(product({product:prod, message:"You must be registered to give rating"}));
    }
    const user = await users.getOne(req.session.userID);
    let rating;
    let review;
    message ="";
    if (!prod.rating || !prod.count){
        prod.count = 0;
    }

    review = {
        rating:req.body.rate,
        user_name:user.email
    }
    if (!prod.reviews){
        prod.reviews= [];
    }

    let edit = 1;

    prod.reviews.map(rev=>{
        if (rev["user_name"] === user.email){
            if (rev["rating"]){
                edit = 2;
            }
            else{
                edit = 3;
            }
            message = "You changed your rating";
            rev["rating"] = req.body.rate;
        }
    })

    if(edit === 1) {
        prod.count++;
        prod.reviews.push(review);
    }
    else if (edit ===3){
        prod.count++;
    }

    let sum =0;

    for (let review of prod.reviews){
        sum+=parseFloat(review["rating"]);
    }
    rating=sum/parseFloat(prod.count);
    console.log(rating)


    await productsRep.change(req.params.id, {rating, count: prod.count,
        title: prod.title, price: prod.price, description: prod.description, reviews : prod.reviews})

    return res.redirect(`/products/${req.params.id}`);
})

router.post("/products/:id/comment", async (req, res)=>{
    const prod = await productsRep.getOne(req.params.id);
    if(!req.session.userID){
        return res.send(product({product:prod, message:"You must be registered to comment"}));
    }
    const user = await users.getOne(req.session.userID);
    message = "";

    if (!prod.reviews){
        prod.reviews= [];
    }


    const review = {
        comment:req.body.comment,
        user_name:user.email
    }

    let edit = false;
    prod.reviews.map(rev=>{
        if (rev["user_name"] === user.email){
            message = "You changed your comment";
            rev["comment"] = req.body.comment;
            edit = true;
        }

    })

    if (edit === false){
        prod.reviews.push(review);
    }
    await productsRep.change(req.params.id, {rating:prod.rating, count: prod.count,
        title: prod.title, price: prod.price, description: prod.description, reviews : prod.reviews})
    return res.redirect(`/products/${req.params.id}`);
})

router.post("/search", async (req, res) => {
    let products = await productsRep.search(req.body.search);
    req.session.search = req.body.search;
    res.send(list({products, searchName:req.body.search}))
})

router.post("/sort", async (req, res) => {
    let products = await productsRep.search(req.session.search);
    if (req.body.sort ==="1"){
        products = await productsRep.sortByPrice(products);
    }
    else if(req.body.sort ==="2"){
        products = await productsRep.sortByTitle(products);
    }
    res.send(list({products}))
})



export default router;