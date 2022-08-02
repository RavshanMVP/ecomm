import express from "express";
import bodyparser from "body-parser";
import authRouter from "./routes/admin/auth.js"
import productsAdminRouter from "./routes/admin/products.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import cookieSession from "cookie-session";

const app = express();
app.use( bodyparser.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ["ec0mm3rc3499l1c4t10n"]
}))
app.use(authRouter);
app.use(productsRouter);
app.use(productsAdminRouter);
app.use(cartsRouter);

app.use(express.static("styles"));
app.listen(3000, ()=>{console.log("listening")})