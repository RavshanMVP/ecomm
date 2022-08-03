import express from "express";
import list from "../views/products/list.js";
import productsRep from "../repositories/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await productsRep.getAll();
    req.session.search = null;
    res.send(list({products}))
})


router.post("/search", async (req, res) => {
    let products = await productsRep.search(req.body.search);
    req.session.search = req.body.search;
    res.send(list({products}))
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