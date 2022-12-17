const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
})

//routes

//signup & login
//create app.post (validation if exist) sign up
//if driver open other page
//update extra info app.put
//create app.post (validation if exist & send type) sign in

//retrieve all books app.get

//stores add books app.post
//stores delete books app.delete

//user add book app.post
//user delete bidItem app.delete
//user adds wishlist app.post
//user views wishlists app.get
//user adds bid app.post
//users view all bids app.get
//user bids app.post

//admin adds coupon app.post
//admin sees users wishlist app.get
//admin assigns orders to drivers app.post
//admin views all drivers info app.get
//admin views all users info app.get

//driver views pending assigned order app.get
//driver finishes order app.post

//coupons

app.post("/addCoupon", async (req, res) => {
    try {
        const { code, discount, maximumUse, isRelative } = req.body;
        const newCoupon = await pool.query("INSERT INTO coupons (code,discount,maximum_use,is_relative) VALUES ($1,$2,$3,$4) RETURNING *"
            , [code, discount, maximumUse, isRelative]);
        res.json(newCoupon);
    } catch (err) {
        console.error(err.message);
    }
});


