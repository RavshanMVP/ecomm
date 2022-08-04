import express from "express";
import list from "../views/products/list.js";
import product from "../views/products/product.js";
import productsRep from "../repositories/products.js";
import users from "../repositories/users.js";
import middleware from "./admin/middleware.js";

const router = express.Router();

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
    res.send(product({product:prod}));
})

router.post("/products/:id/rate", async (req, res) => {

    const prod = await productsRep.getOne(req.params.id);
    if(!req.session.userID){
        return res.send(product({product:prod, message:"You must be registered to give rating"}));
    }
    const user = await users.getOne(req.session.userID);
    let rating;
    let review;
    if (prod.rating && prod.count){
        rating = ((parseFloat(prod.rating) * parseFloat(prod.count)
            + parseFloat(req.body.rate)) / (parseFloat(prod.count)+1))
        prod.count= parseInt(prod.count) + 1;
    }
    else{
        prod.count = 1;
        rating = parseInt(req.body.rate);
    }

    review = {
        rating,
        user_name:user.email
    }
    if (!prod.reviews){
        prod.reviews= [];
    }

    prod.reviews.push(review);

    await productsRep.change(req.params.id, {rating, count: prod.count,
        title: prod.title, price: prod.price, description: prod.description, reviews : prod.reviews})

    res.redirect(`/products/${req.params.id}`)
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