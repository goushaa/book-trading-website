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

// signup
app.post("/signup", async (req, res) => {
    try {

    } catch (err) {
        console.log(err.message);
    }
})


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

//driver views pending assigned order app.get
//driver finishes order app.post

//admin adds coupon app.post (DONE)
//admin sees user's wishlist app.get (NEEDS REVISION)
//admin assigns orders to drivers app.post

//(NEEDS REVISION WHEN SIGNIN IN DONE & (DRIVER,users,bookstores) IS ADDED TO THE SYSTEM)
//admin views all drivers info app.get 
//admin views all users info app.get
//admin views all stores info app.get
//admin views all orders

/////////////////////////////COUPONS/////////////////////////////

//coupons
app.post("/addCoupon", async (req, res) => {
    try {
        //validated in backend
        //code not repeated
        const { code, discount, maximum_use, is_relative } = req.body;
        const couponExist = await pool.query("SELECT * FROM Coupons WHERE code = $1;", [code]);
        if (couponExist.rowCount == 0) {
            //validation in frontend needed
            //discount positive 
            //maximum positive  
            //isRelative 0,1
            const newCoupon = await pool.query("INSERT INTO coupons (code,discount,maximum_use,is_relative) VALUES ($1,$2,$3,$4) RETURNING *;"
                , [code, discount, maximum_use, is_relative]);
            res.json(newCoupon.rows[0]);
            console.log(`SUCCESSFUL INSERTION`);
            //front end should have 4 things for add code
        }
        else {
            console.log(`${code} is already added in the system`);
        }

    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/deleteCoupon", async (req, res) => {
    try {
        //frontend should call this to delete a coupon sending coupon name
        const { code } = req.body;
        const deleteCoupon = await pool.query("DELETE FROM Coupons WHERE code = $1 RETURNING *;", [code]);
        if (deleteCoupon.rowCount == 0) {
            res.send(`COUPON ALREADY ISN'T IN THE SYSTEM`);
            console.log(`COUPON ALREADY ISN'T IN THE SYSTEM`);
        }
        else {
            res.json(deleteCoupon.rows[0]);
            console.log(`SUCCESSFUL DELETION`);
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/coupons", async (req, res) => {
    try {
        const getCoupon = await pool.query("SELECT * FROM Coupons;");
        res.json(getCoupon.rows);
        //front end should loop on all coupons and display them
    } catch (err) {
        console.error(err.message);
    }
});

/////////////////////////////COUPONS/////////////////////////////

//wishlist

app.post("/addWishlist/:id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { book_id } = req.body; //why did we do this
        //NEEDS VALIDATION AND REVISION
        const addWishlist = await pool.query("INSERT INTO wish_list_item VALUES ($1,$2);", [user_id, book_id]);
        res.json(addWishlist);

    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/deleteWishlist/:id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { book_id } = req.body;
        //NEEDS VALIDATION AND REVISION
        const deleteWishlist = await pool.query("DELETE FROM wish_list_item  WHERE user_id = $1 AND book_id = $2 RETURNING *;", [user_id, book_id]);
        if (deleteWishlist.rowCount == 0) {
            res.send(`WISHLIST ALREADY ISN'T IN THE SYSTEM`);
            console.log(`WISHLIST ALREADY ISN'T IN THE SYSTEM`);
        }
        else {
            res.json(deleteWishlist.rows[0]);
            console.log(`SUCCESSFUL DELETION`);
        }

    } catch (err) {
        console.error(err.message);
    }
});

/////////////////////////////ADMIN/////////////////////////////

//admin views drivers
app.get("/drivers", async (req, res) => {
    try {
        const viewDrivers = await pool.query("SELECT * FROM driver, user WHERE user.type = 3;");
        res.json(viewDrivers.rows);
        //front end should loop on all drivers and display them
    } catch (err) {
        console.error(err.message);
    }
});

//admin views driver
app.get("/drivers/:id", async (req, res) => {
    try {
        const { ssn } = req.params;
        const viewDriver = await pool.query("SELECT * FROM driver WHERE ssn = $1;", [ssn]);
        res.json(viewDriver.rows[0]);
        //front end should display one driver when click on him
    } catch (err) {
        console.error(err.message);
    }
});

//admin views stores
app.get("/stores", async (req, res) => {
    try {
        const viewStores = await pool.query("SELECT * FROM user WHERE type = 1;");
        res.json(viewStores.rows);
        //front end should loop on all stores and display them
    } catch (err) {
        console.error(err.message);
    }
});

//admin views store
app.get("/stores/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viewStore = await pool.query("SELECT * FROM user WHERE type = 1 AND id = $1;", [id]);
        res.json(viewStore.rows[0]);
        //front end should display one store when click on it
    } catch (err) {
        console.error(err.message);
    }
});

//admin views users
app.get("/users", async (req, res) => {
    try {
        const viewUsers = await pool.query("SELECT * FROM user WHERE type = 0;");
        res.json(viewUsers.rows);
        //front end should loop on all users and display them
    } catch (err) {
        console.error(err.message);
    }
});

//admin views user
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viewUser = await pool.query("SELECT * FROM user WHERE type = 0 AND id = $1;", [id]);
        res.json(viewUser.rows[0]);
        //front end should display one user when click on it
    } catch (err) {
        console.error(err.message);
    }
});

//admin views orders
app.get("/orders", async (req, res) => {
    try {
        const viewOrders = await pool.query("SELECT * FROM order;");
        res.json(viewOrders.rows);
        //front end should loop on all orders and display them
    } catch (err) {
        console.error(err.message);
    }
});

//admin views order
app.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viewOrder = await pool.query("SELECT * FROM order WHERE id = $1;", [id]);
        res.json(viewOrder.rows[0]);
        //front end should display one order when click on it
    } catch (err) {
        console.error(err.message);
    }
});

/////////////////////////////ADMIN/////////////////////////////
