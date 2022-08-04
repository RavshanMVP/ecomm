import express from "express";
import products from "../../repositories/products.js";
import middleware from "./middleware.js";
import newProduct from "../../views/admin/products/new product.js";
import productsList from "../../views/admin/products/products list.js";
import edit from "../../views/admin/products/edit.js";
import validators from "./validators.js";
import multer from "multer";

const router = express.Router();
const upload = multer({storage : multer.memoryStorage()})

router.get("/admin/products",
    middleware.checkAuthentication,
    async (req, res) => {
    const prodList = await products.getAll();
    res.send(productsList({prodList}));
});

router.get("/admin/products/new",
    middleware.checkAuthentication,
    (req, res) => {
    res.send(newProduct({}));
});


router.post("/admin/products/new",
    middleware.checkAuthentication,
    upload.single("image"),
    [validators.checkTitle, validators.checkPrice],
    middleware.handleErrors(newProduct),
    async (req, res) => {
    const {title, price, description} = req.body;


    try {
        const image = (req.file.buffer.toString("base64"));
        await products.create({title, price,description, image});
        if (req.body.button_id === "1") {
            res.redirect("/admin/products");
        }
        else{
            res.redirect("/admin/products/new")
        }
    }
    catch (err){
        res.send("You must return image");
    }

});


router.get("/admin/products/:id",
    middleware.checkAuthentication,
    async (req, res) => {
    const prod = await products.getOne(req.params.id);
    if(!prod){
        return res.send("Product not found");
    }
    res.send(edit({errors:{}, product:prod}))
})

router.post("/admin/products/:id",
    middleware.checkAuthentication,
    upload.single("image"),
    [validators.checkTitle, validators.checkPrice, validators.checkCount, validators.checkRating],
    middleware.handleErrors(edit, async (req,res)=>{
        const product = await products.getOne(req.params.id);
        return {product};
    }),
    async (req, res) => {
        const {title, price, description, rating, count, reviews} = req.body;

        try {
            if (req.file) {
                const image = (req.file.buffer.toString("base64"));
                await products.change(req.params.id, {title, price, description, rating, count, image, reviews});
            } else {
                await products.change(req.params.id, {title, price, rating, count, description, reviews});
            }
        }
        catch (err){
            res.send("No product with this id")
        }
        res.redirect("/admin/products");
    });

router.post("/admin/products/:id/delete",
    middleware.checkAuthentication,
    async (req, res)=>{
        await products.delete(req.params.id);
        res.redirect("/admin/products");
    })
export default router;