import express from "express";
import list from "../views/products/list.js";
import productsRep from "../repositories/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await productsRep.getAll();
    res.send(list({products}))
})

export default router;