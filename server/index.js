const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


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
        const { first, last, address, city_id, user_name, password, email, type } = req.body;
        const mail = await pool.query('select email from "user" where email=$1', [email]);
        if (mail.rowCount != 0)//testing if the same email is already in the database or not 
        {
            res.json("email already in use");
            return;
        }
        if (type == 4)//in case the sign up is a driver 
        {
            const { ssn, bike_license, driver_license, expiration_date } = req.body;
            isSssn = await pool.query('SELECT ssn FROM driver WHERE ssn=$1', [ssn]);
            if (isSssn.rowCount != 0)//checks for ssn if already in use 
            {
                res.json("ssn already in use");
                return;
            }
            isBike = await pool.query('SELECT bike_license FROM driver WHERE bike_license=$1', [bike_license]);
            if (isBike.rowCount != 0)//checks for bike license if already in use 
            {
                res.json("bike license already in use");
                return;
            }
            isDriver = await pool.query('SELECT driver_license FROM driver WHERE driver_license=$1', [driver_license]);
            if (isDriver.rowCount != 0)//checks for driver license if already in use 
            {
                res.json("driver license already in use");
                return;
            }
            //creats user to link it later to driver
            const sign = await pool.query('INSERT INTO "user" ' + "(first_name,last_name,address,city_id,user_name,password,email,type) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *", [first, last, address, city_id, user_name, password, email, type]);
            console.log(sign.rows[0].id);
            // creating driver and linkning it to user
            const driver = await pool.query("insert into driver(ssn,user_id,bike_license,driver_license,expiration_date) values($1,$2,$3,$4,$5) returning *", [ssn, sign.rows[0].id, bike_license, driver_license, expiration_date]);
            res.json(sign.rows[0]);
        } else// in case of creating any other user than driver 
        {
            const sign = await pool.query('INSERT INTO "user" ' + "(first_name,last_name,address,city_id,user_name,password,email,type) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *", [first, last, address, city_id, user_name, password, email, type]);
            res.json(sign.rows[0]);
            if (type == '2') {
                const order = await pool.query(`INSERT INTO "order" (user_id,status) VALUES ($1,$2) RETURNING *`, [sign.rows[0].id, 0]);
                console.log(order.rows[0]);
            }
        }
    } catch (err) {
        console.log(err.message);
    }
})
//login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const person = await pool.query(`SELECT * FROM "user" WHERE email=$1 AND password=$2`, [email, password]);

        if (person.rowCount != 0) {
            res.json(person.rows[0]);
            console.log(person.row[0]);
        }
        else {
            res.json("-1");
            console.log(person.row[0]);
        }
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/cityidfromcityname", async (req, res) => {
    try {
        const { city_name } = req.body;
        const city_id = await pool.query(`SELECT id FROM city WHERE name = $1`, [city_name]);

        if (city_id.rowCount != 0) {
            res.json(city_id.rows[0]);
            console.log(city_id.row[0]);
        }
        else {
            res.json("-1");
            console.log(city_id.row[0]);
        }
    } catch (err) {
        console.log(err.message);
    }
});



//unread number


//type
//0 =>superadmin
//1 =>admin
//2 =>user
//3 =>store
//4 =>driver

//retrieve all books app.get

//stores add books app.post
app.post("/addbook", async (req, res) => {
    try {
        var { title, genre_id, isbn, author_name, language_id, purshace_price, version, description, image, user_id, count } = req.body;
        //checking for nulls in gernre,isbn,language_id
        //front enter enters user couut with 1 but bookstores count with anything
        //front end will not let other users (superadmin-admin-driver) go into the my books page
        if (genre_id == -1) genre_id = 'null';
        if (isbn == -1) isbn = 'null';
        if (language_id == -1) language_id = 'null';

        book = await pool.query("INSERT INTO book (title,genre_id,isbn,author_name,language_id,purchase_price,version,description,image,user_id,count,status) values($1," + genre_id + "," + isbn + ",$2," + language_id + ",$3,$4,$5,$6,$7,$8,0) RETURNING *", [title, author_name, purshace_price, version, description, image, user_id, count]);
        res.json(book.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//stores delete books app.delete
app.delete("/deletebook", async (req, res) => {
    try {
        const { id } = req.body;
        book = await pool.query("UPDATE BOOK SET status=1 where id=$1", [id]);
        res.json(book.rowCount);
    } catch (err) {
        console.log(err.message);
    }
})

app.get("/userbooks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const getUserStoreBooks = await pool.query("SELECT * FROM book WHERE user_id=$1 AND status=0", [id]);
        res.json(getUserStoreBooks.rows);
        //front end should loop on all books in certain user/store selling and display them
    } catch (err) {
        console.error(err.message);
    }
})
//add book to cart
app.post("/addToCart", async (req, res) => {
    try {
        const { book_id, order_id, quantity } = req.body;
        const orderItem = await pool.query("INSERT INTO order_item (book_id,order_id,quantity,paid_status) VALUES ($1,$2,$3,0) RETURNING *", [book_id, order_id, quantity]);
        res.json(orderItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//user submits order
app.post("/makeOrder", async (req, res) => {
    try {
        var { coupon_id, order_id } = req.body;
        //status 1 means pending
        const checkEmpty = await pool.query("SELECT COUNT(order_id) FROM order_item where order_id=$1", [order_id]);
        if (checkEmpty.rows[0].count == 0) {
            console.log("empty order");
            res.json("empty order");
            return;
        }
        const date = new Date;
        console.log(date);
        if (coupon_id == -1) coupon_id = 'null';
        const makeOrder = await pool.query('UPDATE "order" SET status=1,order_date = $1,coupon_id =' + coupon_id + " WHERE id=$2 RETURNING *", [date, order_id]);
        //res.json(makeOrder.rows[0]);
        const newOrder = await pool.query(`INSERT INTO "order" (user_id,status) VALUES ($1,$2) RETURNING *`, [makeOrder.rows[0].id, 0]);
        res.json(newOrder.rows[0]); //we always check on the order with status 0 thus orders items in the cart
    } catch (err) {
        console.error(err.message);
    }
});

//Admin gives order to certain driver
app.post("/AdminGiveOrderToDriver", async (req, res) => {
    try {
        //assuming admin only sees orders of status one here
        const { driver_ssn, order_id, driver_user_id } = req.body;
        //status 2 means driver starts delivering
        const giveOrder = await pool.query('UPDATE "order" SET status=2,driver_ssn = $1 WHERE id=$2 RETURNING *', [driver_ssn, order_id]);
        //send notification to driver 
        const date = new Date;
        console.log(order_id);
        console.log(driver_user_id);
        console.log(date);
        const sendNotificationDriver = await pool.query("INSERT INTO notification (user_id,read,text,date) VALUES ($1,0,'You have been assigned order #" + order_id + " ',$2) RETURNING *", [driver_user_id, date]);
        const sendNotificationUser = await pool.query("INSERT INTO notification (user_id,read,text,date) VALUES ($1,0,'Your order #" + order_id + " has been assigned to a driver',$2) RETURNING *", [giveOrder.rows[0].user_id, date]);
        console.log(sendNotificationDriver.rows[0]);
        console.log(sendNotificationUser.rows[0]);
        res.json(giveOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Delivered
app.post("/deliverOrder", async (req, res) => {
    try {
        const { order_id } = req.body;
        const date = new Date;
        //status 3 means driver delivered it
        const deliverOrder = await pool.query('UPDATE "order" SET status=3,delivery_date = $1 WHERE id=$2 RETURNING *', [date, order_id]);
        res.json(deliverOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/notifications", async (req, res) => {
    try {

        // return the last 10 notifications 
        // page returns other 10's
        var { user_id, page } = req.body;
        page = (page - 1) * 10;
        console.log(user_id, page);
        const viewNotifications = await pool.query("SELECT * FROM notification WHERE user_id = $1 ORDER BY date DESC LIMIT 10 offset $2;", [user_id, page]);
        res.json(viewNotifications.rows);
        //front end should loop on all feedbacks and display them
    } catch (err) {
        console.error(err.message);
    }
});

//read notification
app.post("/notification/read", async (req, res) => {
    try {
        const { notification_id } = req.body;
        const readNotification = await pool.query("UPDATE notification SET read=1 where id=$1 returning *", [notification_id]);
        res.json(readNotification.rows[0]);
    } catch (err) {
        console.error(err);
    }
})

//UNDER CONSTRUCTION (REAL ALL)
app.post("/notifications/readall", async (req, res) => {
    try {
        const { notification_id } = req.body;
        const realAllNotifications = await pool.query("UPDATE notification SET read=1 where id=$1 returning &", [notification_id]);
        res.json(realAllNotifications);
    } catch (err) {
        console.error(err);
    }
})



// app.post("/addImage", async (req, res) => {
//     try {
//         console.log(pr);
//      const {image}=req.body;
//      const result=await cloudinary.uploader.upload(image,{
//     folder : books
//     })

//      console.log(result.public_id,result.secure_url);
//     } catch (err) {
//         console.error(err.message);
//     }
// });



//user delete bidItem app.delete
//user adds wishlist app.post
//user views wishlists app.get
//user adds bid app.post
//users view all bids app.get
//user bids app.post

//driver views pending assigned order app.get
//driver finishes order app.post
//get cities
app.get("/cities", async (req, res) => {
    try {
        const cities = await pool.query("select * from city");
        res.json(cities.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/genres", async (req, res) => {
    try {
        const genres = await pool.query("SELECT * FROM genre");
        res.json(genres.rows);

    } catch (err) {
        console.log(err.message);
    }
});

app.get("/languages", async (req, res) => {
    try {
        const languages = await pool.query("SELECT * FROM language");
        res.json(languages.rows);
    } catch (err) {
        console.log(err.message);
    }
});

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
            res.json(`-1`);
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

app.get("/coupons/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const getCoupon = await pool.query("SELECT * FROM Coupons WHERE code = $1;", [code]);
        res.json(getCoupon.rows[0]);
        //front end should display single coupon
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/coupons/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const getCoupon = await pool.query("DELETE FROM Coupons WHERE code = $1;", [code]);
        res.json(getCoupon.rows[0]);
        //front end should display single coupon
    } catch (err) {
        console.error(err.message);
    }
});

/////////////////////////////COUPONS/////////////////////////////

//wishlist

app.post("/addWishlist/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { book_id } = req.body; //why did we do this
        //NEEDS VALIDATION AND REVISION
        const addWishlist = await pool.query("INSERT INTO wish_list_item (user_id,book_id) VALUES ($1,$2) RETURNING *;", [user_id, book_id]);
        res.json(addWishlist.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

app.post("/deleteWishlist/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { book_id } = req.body;
        //NEEDS VALIDATION AND REVISION
        const deleteWishlist = await pool.query("DELETE FROM wish_list_item  WHERE user_id = $1 AND book_id = $2 RETURNING *;", [user_id, book_id]);
        if (deleteWishlist.rowCount == 0) {
            res.json(`WISHLIST ALREADY ISN'T IN THE SYSTEM`);
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

//superadmin views admins
app.get("/admins", async (req, res) => {
    try {
        const viewAdmins = await pool.query(`SELECT * FROM "user" WHERE type = 1;`);
        res.json(viewAdmins.rows);
        //front end should loop on all admins and display their info
    } catch (err) {
        console.error(err.message);
    }
});

//superadmin views admin
app.get("/admins/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viewAdmin = await pool.query(`SELECT * FROM "user" WHERE type = 1 AND id = $1;`, [id]);
        res.json(viewAdmin.rows[0]);
        //front end should display one admin when click on him
    } catch (err) {
        console.error(err.message);
    }
});

//admin views drivers
app.get("/drivers", async (req, res) => {
    try {
        const viewDrivers = await pool.query(`SELECT * FROM driver d, "user" u WHERE u.type = 4;`);
        res.json(viewDrivers.rows);
        //front end should loop on all drivers and display them
    } catch (err) {
        console.error(err.message);
    }
});

//admin views driver
app.get("/drivers/:ssn", async (req, res) => {
    try {
        const { ssn } = req.params;
        const viewDriver = await pool.query(`SELECT * FROM driver d,"user" u WHERE d.ssn = $1 AND d.user_id = u.id;`, [ssn]);
        res.json(viewDriver.rows[0]);
        //front end should display one driver when click on him
    } catch (err) {
        console.error(err.message);
    }
});

//admin views stores
app.get("/stores", async (req, res) => {
    try {
        const viewStores = await pool.query(`SELECT * FROM "user" WHERE type = 3;`);
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
        const viewStore = await pool.query(`SELECT * FROM "user" WHERE type = 3 AND id = $1;`, [id]);
        res.json(viewStore.rows[0]);
        //front end should display one store when click on it
    } catch (err) {
        console.error(err.message);
    }
});

//admin views users
app.get("/users", async (req, res) => {
    try {
        const viewUsers = await pool.query(`SELECT * FROM "user" WHERE type = 2;`);
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
        const viewUser = await pool.query(`SELECT * FROM "user" WHERE type = 2 AND id = $1;`, [id]);
        res.json(viewUser.rows[0]);
        //front end should display one user when click on it
    } catch (err) {
        console.error(err.message);
    }
});

//admin views pending orders
app.get("/pendingOrders", async (req, res) => {
    try {
        const viewPendingOrders = await pool.query("SELECT * FROM order WHERE status = 1;");
        res.json(viewPendingOrders.rows);
        //front end should loop on all orders and display them
    } catch (err) {
        console.error(err.message);
    }
});

//get driver user id given ssn
app.get("/driveruseridgivenssn", async (req, res) => {
    try {
        const { driver_ssn } = req.body;
        const getuserid = await pool.query("SELECT user_id FROM driver WHERE ssn = $1;", [driver_ssn]);
        res.json(getuserid.rows[0]);
        //front end should loop on all orders and display them
    } catch (err) {
        console.error(err.message);
    }
});

//view order
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

//admin views all users feedback
app.get("/feedback", async (req, res) => {
    try {
        const viewfeedbacks = await pool.query("SELECT * FROM feedback;");
        res.json(viewfeedbacks.rows);

        //front end should loop on all feedbacks and display them
    } catch (err) {
        console.error(err.message);
    }
});

/////////////////////////////ADMIN/////////////////////////////



//////////////MOHAMED & MUSTAFA REQUESTS///////////////////////

app.get("/wishlists", async (req, res) => {
    try {
        const viewWishlists = await pool.query("SELECT * FROM wish_list_item;"); //wrong query ik (tell me how to fix it)
        res.json(viewWishlists.rows);


    } catch (err) {
        console.error(err.message);
    }
});

app.get("/wishlists/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const viewUserWishlists = await pool.query("SELECT * FROM wish_list_item WHERE user_id = $1;", [user_id])
        res.json(viewUserWishlists.rows); //book_id refers to what?


    } catch (err) {
        console.error(err.message);
    }
});

app.get("/ordersbycertaindriver", async (req, res) => {
    try {
        const { ssn } = req.body
        const viewOrders = await pool.query('SELECT * FROM driver d,"order" o WHERE o.driver_ssn = d.ssn AND d.ssn = $1 AND o.status = 2;', [ssn]); //order to be delivered by certain driver
        res.json(viewOrders.rows);


    } catch (err) {
        console.error(err.message);
    }
});

app.get("/driverorderitemstodeliver", async (req, res) => {
    try {
        const { ssn } = req.body
        const viewOrders = await pool.query('SELECT * FROM driver d,order_item o WHERE o.driver_ssn = d.ssn AND d.ssn = $1 ;', [ssn]); //don't know yet how to write
        res.json(viewOrders.rows);


    } catch (err) {
        console.error(err.message);
    }
});

app.post("/updateUser", async (req, res) => {
    try {
        const { first, last, address, city_id, user_name, id } = req.body
        const updateUser = await pool.query('UPDATE "user" SET first_name = $1, last_name = $2, address = $3, city_id = $4, user_name = $5 WHERE id = $6 RETURNING *', [first, last, address, city_id, user_name, id]);
        res.json(updateUser.rows[0]);


    } catch (err) {
        console.error(err.message);
    }
});

app.get("/books", async (req, res) => {
    try {
        const getBooks = await pool.query('SELECT * FROM book WHERE status = 0');
        res.json(getBooks.rows);


    } catch (err) {
        console.error(err.message);
    }
});

app.post("/bookinfo", async (req, res) => {
    try {
        const { book_id } = req.body;
        const getBookInfo = await pool.query('SELECT * FROM book WHERE id = $1', [book_id]);
        res.json(getBookInfo.rows[0]);


    } catch (err) {
        console.error(err.message);
    }
});

app.post("/bookinfo/:book_id", async (req, res) => {
    try {
        const { book_id } = req.params;
        const getBookInfo = await pool.query('SELECT * FROM book WHERE id = $1', [book_id]);
        res.json(getBookInfo.rows[0]);


    } catch (err) {
        console.error(err.message);
    }
});

app.get("/orderItemInfo/:book_id", async (req, res) => {
    try {
        const { book_id } = req.params;
        const getOrderItemInfo = await pool.query('SELECT * FROM book b, order_item o WHERE b.id = o.book_id AND b.id = $1', [book_id]);
        res.json(getOrderItemInfo.rows[0]);


    } catch (err) {
        console.error(err.message);
    }
});



//////////////MOHAMED & MUSTAFA REQUESTS///////////////////////