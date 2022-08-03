import express from "express";
import carts from "../repositories/carts.js";
import showCart from "../views/carts/showCart.js";
import products from "../repositories/products.js";
import middleware from "./admin/middleware.js";
import history from "../views/carts/history.js";

const router = express.Router();
router.post("/cart/products/:id", async(req, res)=>{
    let cart;
    let date = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ` +
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    if (!req.session.CartID){
        cart = await carts.create({items:[]});
        req.session.CartID = cart.id;
    }
    else{
        cart = await carts.getOne(req.session.CartID)
    }
    let item;
    if (cart.items) {
        item = cart.items.find(value => value["productID"] === req.params.id)
    }
    if (!item){
        cart.items.push({productID:req.params.id, quantity:1});
    }
    else{
        item["quantity"]++;
    }
    if (req.session.userID){
        await carts.change(cart.id, {items:cart.items, user: req.session.userID, date});
    }
    else{
        await carts.change(cart.id, {items:cart.items, date});
    }


    res.redirect("/cart");
})

router.get("/cart", async (req, res) => {
    if(!req.session.CartID){
        return res.redirect("/");
    }
    const cart = await carts.getOne(req.session.CartID);

    for (let item of cart.items){
        const product = await products.getOne(item["productID"]);
        item.product = product;
    }
    return res.send(showCart({items:cart.items}));
})

router.post("/cart/:id", async (req, res)=>{
    const cart = await carts.getOne(req.session.CartID);
    const items = cart.items.filter(item => {
        return item["productID"] !== req.params.id
    });
    await carts.change(cart.id, {items});
    return res.redirect("/cart");
})

router.post("/cart/:id/inc", async (req, res)=>{
    const cart = await carts.getOne(req.session.CartID);
    const item = cart.items.find(item => {
        return item["productID"] === req.params.id
    });
    item.quantity++;
    await carts.change(cart.id, {items:cart.items});
    return res.redirect("/cart");
})

router.post("/cart/:id/dec", async (req, res)=>{
    const cart = await carts.getOne(req.session.CartID);
    let items;
    const item = cart.items.find(item => {
        return item["productID"] === req.params.id
    });
    item.quantity--;
    if (item.quantity===0){
        items = cart.items.filter(it => {
            return it !== item;
        });
        await carts.change(cart.id, {items});
    }
    if(!items){items = cart.items}
    await carts.change(cart.id, {items});
    return res.redirect("/cart");
})

router.post("/history",async (req, res) => {
    let myCarts = await carts.getAll();
    myCarts = await myCarts.filter(cart => cart.user === req.session.userID);
    for (let cart of myCarts){
    for (let item of cart.items){
        const product = await products.getOne(item["productID"]);
        item.product = product;
    }
    }

    myCarts = myCarts.sort((a,b)=>{
        return b["date"].localeCompare(a["date"]);
    })
    myCarts = myCarts.filter(cart=>{
        return cart["items"].length > 0;
    })
    res.send(history({carts:myCarts}));

})

router.post("/buy", async (req, res) => {
    if (req.session.userID){
    const cart = await carts.getOne(req.session.CartID);
    req.session.CartID = null;
    }
    else{
        req.session = null;
    }
    res.redirect("/");
})

export default router;