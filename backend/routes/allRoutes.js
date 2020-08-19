let express = require('express');
let router = express.Router();
let response = require('./Response');
let UserDetail = require('../schema/UserDetailSchema');
let Productdetail = require('../schema/ProductDetailSchema');
let QuoteDetail = require('../schema/QuoteDetailSchema');
let VendorDetail = require('../schema/VendorDetailSchema');
let Categorydetail = require('../schema/CategoryDetailSchema');
let CustomerVisits = require('../schema/CustomersVisitsSchema');
let ScheduleVisits = require('../schema/ScheduleVisitsSchema');
let UserType = require('../schema/UserTypeSchema');
let ExpenseDetail = require('../schema/ExpenseDetailSchema');
let ExpenseItemSchema = require('../schema/ExpenseItemSchema');

let UserActions = require('../schema/UserActionsSchema');
let CheckInOutStatus = require('../schema/CheckInOutDetailsSchema');

let verifyToken = require('../controllers/controllers');
let sendMail = require('../controllers/sendMail');
let jwt = require('jsonwebtoken');
const VendorDetailSchema = require('../schema/VendorDetailSchema');

let SECRET = "superSec";
// let serverURL = "localhost:3000";
let serverURL = "";

router.post("/register", async function (req, res) {
    console.log("Enter: register");
    try {
        let userDetail = new UserDetail(req.body);
        userDetail.user_id = Date.now();
        let result = await userDetail.save();
        console.log("Success");
        response.success(req, res, "Success register", userDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/login", async function (req, res) {
    console.log("Enter: login");
    try {
        let result = await UserDetail.findOne({ 'email': req.body.email, 'password': req.body.password });
        console.log("Success", result);
        if (result) {
            var token = jwt.sign({ user_id: result.user_id, username: result.username,
                 email: result.email, usertype_name: result.usertype_name }, SECRET);

            let userActionObj = {
                action_id: Date.now(),
                user_id: result.user_id,
                /*  username: result.username, */
                email: result.email,
                action: 'Login'
            }
            let userAction = new UserActions(userActionObj);
            await userAction.save();
            console.log("TOKEN ::::", token);
            response.success(req, res, "Success login", token);
        } else {
            res.json({ status: 404, message: "User not found, Please check password or register" })
        }

    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addUser", authenticateToken, async function (req, res) {
    console.log("Enter: addUser");
    try {
        console.log("BODY:", req.body);
        let r1 = await UserDetail.findOne({ "email": req.body.email });
        if (r1 != null) {
            throw new Error("User email already exists.");
        }
        let userDetail = new UserDetail(req.body);
        userDetail.user_id = Date.now();
        let result = await userDetail.save();
        console.log("Success");
        //naveen final code changes  
        let msg = '<b>Hi User' + ' (' + req.body.username + ')' + '</b><br><br> New User is created in sales app on your name. Please find the Login details:<br /><br />Email address: ' + req.body.email + '<br />Password: ' + req.body.password + '<br /><br /><br /><br />Thanks,<br /> Admin';
        console.log(msg);
        if (result) {
            sendMail(req.body.email, "New User Created", msg);
        }
        response.success(req, res, "Success addUser", userDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addVendor", authenticateToken, async function (req, res) {
    console.log("Enter: addVendor");
    try {
        let vendorDetail = new VendorDetail(req.body);
        vendorDetail.vendor_id = Date.now();
        let result = await vendorDetail.save();
        console.log("Success");
        response.success(req, res, "Success addVendor", vendorDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/updateUser", authenticateToken, async function (req, res) {
    try {
        let user_id = req.body.user_id;
        let result = await UserDetail.updateOne({ 'user_id': user_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateUser", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/updateVendor", authenticateToken, async function (req, res) {
    try {
        let vendor_id = req.body.vendor_id;
        let result = await VendorDetail.updateOne({ 'vendor_id': vendor_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateVendor", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/updateProduct", authenticateToken, async function (req, res) {
    try {
        let product_id = req.body.product_id;
        let result = await Productdetail.updateOne({ 'product_id': product_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/updateQuote", authenticateToken, async function (req, res) {
    try {
        let quote_id = req.body.quote_id;
        let result = await QuoteDetail.updateOne({ 'quote_id': quote_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateQuote", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addProduct", authenticateToken, async function (req, res) {
    console.log("Enter: addProduct");
    try {
        let productdetail = new Productdetail(req.body);
        productdetail.product_id = Date.now();
        let result = await productdetail.save();
        console.log("Success");
        response.success(req, res, "Success addProduct", productdetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addQuote", authenticateToken, async function (req, res) {
    console.log("Enter: addQuote");
    try {
        let quoteDetail = new QuoteDetail(req.body);
        quoteDetail.quote_id = Date.now();
        let result = await quoteDetail.save();
        console.log("Success");
        response.success(req, res, "Success addQuote", quoteDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllUsers", authenticateToken, async function (req, res) {
    console.log("Enter: getAllUsers");
    try {
        let result = await UserDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllUsers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/getUsersByUserType", authenticateToken, async function (req, res) {
    console.log("Enter: getUsersByUserType");
    try {
        let result = await UserDetail.find({ usertype_name: req.body.userType });
        console.log("Success");
        response.success(req, res, "Success getUsersByUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getUsers", authenticateToken, async function (req, res) {
    console.log("Enter: getAllUsers");
    try {
        let result = await UserDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllUsers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllProducts", authenticateToken, async function (req, res) {
    console.log("Enter: getAllProducts");
    try {
        let result = await Productdetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllProducts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* 
router.get("/getAllQuotes", authenticateToken, async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {

        let result = await QuoteDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */
router.get("/getAllQuotes1", authenticateToken,async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {


        let quoteDetailsArr = await QuoteDetail.find();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
            console.log("QuoteDetailArr[k]::", quoteDetailsArr[k].vendor_id);
            let vendor_id = quoteDetailsArr[k].vendor_id;
            let vendor = await VendorDetail.findOne({ "vendor_id": vendor_id });
            if (vendor == null) continue;
            let obj = {
                "quote_id": quoteDetailsArr[k].quote_id,
                "vendor_id": quoteDetailsArr[k].vendor_id,
                "quotation_date": quoteDetailsArr[k].quotation_date,
                "total_cost": quoteDetailsArr[k].total_cost,
                "product_name": quoteDetailsArr[k].product_name,

                "customer_name": vendor.customer_name,
                "phone": vendor.phone


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllQuotes", authenticateToken,async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {


        let quoteDetailsArr = await QuoteDetail.find();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
            //console.log("QuoteDetailArr[k]::", quoteDetailsArr[k].vendor_id);
            let vendor_id = quoteDetailsArr[k].vendor_id;
            let vendor = await VendorDetail.findOne({ "vendor_id": vendor_id });
            if (vendor == null) continue;
            let obj = {
                "quote_id": quoteDetailsArr[k].quote_id,
                "vendor_id": quoteDetailsArr[k].vendor_id,
                "quotation_date": quoteDetailsArr[k].quotation_date,
                "total_cost": quoteDetailsArr[k].total_cost,
                "product_name": quoteDetailsArr[k].product_name,

                /* "customer_name": vendor.customer_name,
                "phone": vendor.phone
               */

            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllVendors", authenticateToken, async function (req, res) {
    console.log("Enter: getAllVendors");
    try {
        let result = await VendorDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllVendors", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getUser/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getUser");
    try {
        console.log(req.params);
        let result = await UserDetail.findOne({ 'user_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getUser", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getVendors/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getVendor");
    try {
        console.log(req.params);
        let result = await VendorDetail.findOne({ 'vendor_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getVendor", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getQuote/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getQuote");
    try {
        console.log(req.params);
        let quotesResult = await QuoteDetail.findOne({ 'quote_id': req.params.id }, req.body);
      /*   console.log("Success", result);
        response.success(req, res, "Success getQuote", result); */
        let vendorResult = await VendorDetail.findOne({"vendor_id" : quotesResult["vendor_id"]});

        let obj = {
            "quote_id": quotesResult.quote_id,
            "vendor_id": quotesResult.vendor_id,
            "quotation_date": quotesResult.quotation_date,
            "total_cost": quotesResult.total_cost,
            "product_name": quotesResult.product_name,
            "customer_name": vendorResult.customer_name,
            "phone": vendorResult.phone,
               
    };
    console.log("Success", obj);
    response.success(req, res, "Success getQuote", obj);
} catch (error) {
    console.log("Failure:", error);
    response.serverError(req, res, error.message, error);
}
});


router.get("/getProduct/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProduct");
    try {
        console.log(req.params);
        let result = await Productdetail.findOne({ 'product_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteUser", authenticateToken, async function (req, res) {
    try {
        let user_id = req.body.user_id;
        let result = await UserDetail.deleteOne({ 'user_id': user_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteUser", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteVendor", authenticateToken, async function (req, res) {
    try {
        let vendor_id = req.body.vendor_id;
        let result = await VendorDetail.deleteOne({ 'vendor_id': vendor_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteVendor", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteProduct", authenticateToken, async function (req, res) {
    try {
        let product_id = req.body.product_id;
        let result = await Productdetail.deleteOne({ 'product_id': product_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteQuote", authenticateToken, async function (req, res) {
    try {
        let quote_id = req.body.quote_id;
        let result = await QuoteDetail.deleteOne({ 'quote_id': quote_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteQuote", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCategory", authenticateToken, async function (req, res) {
    try {
        let category_id = req.body.category_id;
        let result = await Categorydetail.updateOne({ 'category_id': category_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addCategory", authenticateToken, async function (req, res) {
    console.log("Enter: addCategory");
    try {
        let categorydetail = new Categorydetail(req.body);
        categorydetail.category_id = Date.now();
        let result = await categorydetail.save();
        console.log("Success");
        response.success(req, res, "Success addCategory", categorydetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllCategory", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCategory");
    try {
        let result = await Categorydetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getCategory/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCategory");
    try {
        console.log(req.params);
        let result = await Categorydetail.findOne({ 'category_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteCategory", authenticateToken, async function (req, res) {
    try {
        let category_id = req.body.category_id;
        let result = await Categorydetail.deleteOne({ 'category_id': category_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTotalUsers", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalUsers");
    try {
        console.log(req.params);
        let result = await UserDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalUsers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTotalQuotes", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalQuotes");
    try {
        console.log(req.params);
        let result = await QuoteDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalQuotes", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTotalProducts", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalProducts");
    try {
        console.log(req.params);
        let result = await Productdetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalProducts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTotalVendors", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalVendors");
    try {
        console.log(req.params);
        let result = await VendorDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalProducts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getTotalVisits", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalVisits");
    try {
        console.log(req.params);
        let result = await CustomerVisits.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/updateUserType", authenticateToken, async function (req, res) {
    try {
        let usertype_id = req.body.usertype_id;
        let result = await UserType.updateOne({ 'usertype_id': usertype_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addUserType", authenticateToken, async function (req, res) {
    console.log("Enter: addCategory");
    try {
        let usertype = new UserType(req.body);
        usertype.usertype_id = Date.now();
        let result = await usertype.save();
        console.log("Success");
        response.success(req, res, "Success addCategory", usertype);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllUserType", authenticateToken, async function (req, res) {
    console.log("Enter: getAllUserType");
    try {
        let result = await UserType.find();
        console.log("Success");
        response.success(req, res, "Success getAllUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getUserType/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getUserType");
    try {
        console.log(req.params);
        let result = await UserType.findOne({ 'usertype_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.post("/deleteUserType", authenticateToken, async function (req, res) {
    try {
        let usertype_id = req.body.usertype_id;
        let result = await UserType.deleteOne({ 'usertype_id': usertype_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

///////////////////////// -- Visits code -- /////////////////////////
router.post("/addVisit", authenticateToken, async function (req, res) {
    console.log("Enter: addVisits", req.body);
    try {
        let visitDetail = new CustomerVisits(req.body);
        //visitDetail.visit_id = Date.now();
        let result = await visitDetail.save();
        console.log("Success");
        if (result) {
            let admins = await UserDetail.find({ usertype_name: 'Admin' });
            let emailSub = "A new visit is added";
            //naveen final code changes
            let emailText;
            for (let i = 0; i < admins.length; i++) {
                emailText = '<b>Hi Admin' + ' (' + admins[i].username + ')' +
                    '</b><br><br> A visit has been made by “Sales User” please find the details below:<br /><br />' +
                    'Customer Name: ' + req.body.customer_name + '<br />' +
                    'Email: ' + req.body.email + '<br />' +
                    'Phone: ' + req.body.phone + '<br />' +
                    'First Name: ' + req.body.first_name + '<br />' +
                    'address: ' + req.body.address + '<br />' +
                    'Vendor Id: ' + req.body.vendor_id + '<br />' +
                    'visits_note: ' + req.body.visits_note + '<br />' +
                    'Latitude: ' + req.body.lat + '<br />' +
                    'Longitude: ' + req.body.long + '<br />' +
                    'Visit added By Username: ' + req.body.visit_added_by_username + '<br />' +
                    'Visit added By Name: ' + req.body.visit_added_by_name + '<br />' +
                    'Visit added By Email: ' + req.body.visit_added_by_email + '<br />' +
                    'visit Id:' + req.body.visit_id + '<br />' +
                    '<br /><br /><br /><br />Thanks,<br /> SalesUser ' + req.body.visit_added_by_name;
                sendMail(admins[i].email, emailSub, emailText);
            }
        }
        response.success(req, res, "Success addVisits", visitDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getVisit/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getVisit");
    try {
        console.log(req.params);
        let visitResult = await CustomerVisits.findOne({ 'visit_id': req.params.id });
        let vendorResult = await VendorDetail.findOne({"vendor_id" : visitResult["vendor_id"]});
        let obj = {
            "visit_id": visitResult.visit_id,
            "visits_note": visitResult.visits_note,
            "lat": visitResult.lat,
            "long": visitResult.long,
            "vendor_id": visitResult.vendor_id,
            "customer_name": vendorResult.customer_name,
            "email": vendorResult.email,
            "phone": vendorResult.phone,
            "first_name": vendorResult.first_name,
            "last_name": vendorResult.last_name,
            "address": vendorResult.address,
        };
        console.log("Success", obj);
        response.success(req, res, "Success getVisit", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllVisits", authenticateToken,async function (req, res) {
    console.log("Enter: getAllVisits");
    try {
        let customerVisitsArr = await CustomerVisits.find();
        let objArr = [];
        for (var k = 0; k < customerVisitsArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let vendor_id = customerVisitsArr[k].vendor_id;
            let vendor = await VendorDetail.findOne({ "vendor_id": vendor_id });
            if (vendor == null) continue;
            let obj = {
                "visits_note": customerVisitsArr[k].visits_note,
                "lat": customerVisitsArr[k].lat,
                "long": customerVisitsArr[k].long,
                "vendor_id": customerVisitsArr[k].vendor_id,
                "visit_id": customerVisitsArr[k].visit_id,
                /*   "customer_name": vendor.customer_name,
                  "email": vendor.email,
                  "phone": vendor.phone,
                  "first_name": vendor.first_name,
                  "last_name": vendor.last_name,
                  "address": vendor.address, */
            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllVisits", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
/* 
router.get("/getAllVisits", authenticateToken, async function (req, res) {
    console.log("Enter: getAllVisits");
    try {
        let customerIds = await CustomerVisits.find({}, { _id: 0, vendor_id: 1 });
        let vendorDetailArr = [];
        let customerIdArr = [];
        for (let k = 0; k < customerIds.length; k++) {
            customerIdArr.push(customerIds[k].vendor_id);
            vendorDetailArr.push(await VendorDetail.findOne({ "vendor_id":  customerIds[k].vendor_id}));
        }
        let result = vendorDetailArr;
        console.log("Success");
        response.success(req, res, "Success getAllVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});  */

router.get("/getAllVisits1", authenticateToken,async function (req, res) {
    console.log("Enter: getAllVisits");
    try {
        let customerVisitsArr = await CustomerVisits.find();
        let objArr = [];
        for (var k = 0; k < customerVisitsArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let vendor_id = customerVisitsArr[k].vendor_id;
            let vendor = await VendorDetail.findOne({ "vendor_id": vendor_id });
            if (vendor == null) continue;
            let obj = {
                "visit_id": customerVisitsArr[k].visit_id,
                "visits_note": customerVisitsArr[k].visits_note,
                "lat": customerVisitsArr[k].lat,
                "long": customerVisitsArr[k].long,
                "vendor_id": customerVisitsArr[k].vendor_id,
                "customer_name": vendor.customer_name,
                "email": vendor.email,
                "phone": vendor.phone,
                "first_name": vendor.first_name,
                "last_name": vendor.last_name,
                "address": vendor.address,
               " visit_added_by_email":vendor.visit_added_by_email, 
            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllVisits", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getVisitsOfSalesUser", authenticateToken, async function (req, res) {
    console.log("Enter: getVisitsOfSalesUser");
    try {
     
        let customerVisitsArr = await CustomerVisits.find({ "visit_added_by_email ": req.clientDetails.email });
        let objArr = [];
        for (var k = 0; k < customerVisitsArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let vendor_id = customerVisitsArr[k].vendor_id;
            let vendor = await VendorDetail.findOne({ "vendor_id": vendor_id });
            if (vendor == null) continue;
            let obj = {
                "visit_id": customerVisitsArr[k].visit_id,
                "visits_note": customerVisitsArr[k].visits_note,
                "lat": customerVisitsArr[k].lat,
                "long": customerVisitsArr[k].long,
                "vendor_id": customerVisitsArr[k].vendor_id,
                "customer_name": vendor.customer_name,
                "email": vendor.email,
                "phone": vendor.phone,
                "first_name": vendor.first_name,
                "last_name": vendor.last_name,
                "address": vendor.address,
            };
            objArr.push(obj);
        }
        response.success(req, res, "Success getVisitsOfSalesUser", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


// router.get("/getAllVisits", async function (req, res) {
//     console.log("Enter: getAllVisits");
//     try {
//         let result = await CustomerVisits.find();
//         console.log("Success");
//         response.success(req, res, "Success getAllVisits", result);
//     } catch (error) {
//         console.log("Failure:", error);
//         response.serverError(req, res, error.message, error);
//     }
// }); 

// router.get("/getVisitsOfSalesUser", authenticateToken, async function (req, res) {
//     console.log("Enter: getVisitsOfSalesUser");
//     try {
//         let customerIds = await CustomerVisits.find({ "visit_added_by_email": req.clientDetails.email }, { _id: 0, vendor_id: 1 });
//         let vendorDetailArr = [];
//         let customerIdArr = [];
//         for (let k = 0; k < customerIds.length; k++) {
//             customerIdArr.push(customerIds[k].vendor_id);
//             vendorDetailArr.push(await VendorDetail.findOne({ "vendor_id": customerIds[k].vendor_id }));
//         }
//         let result = vendorDetailArr;
//         console.log("Success");
//         response.success(req, res, "Success getVisitsOfSalesUser", result);
//     } catch (error) {
//         console.log("Failure:", error);
//         response.serverError(req, res, error.message, error);
//     }
// });



router.post("/getVisitsBetweenDates", authenticateToken, async function (req, res) {
    console.log("Enter: getVisitsBetweenDates");
    try {
        let result = await CustomerVisits.find({ visit_id: { $gte: req.body.from, $lt: req.body.to } });
        console.log("Success");
        response.success(req, res, "Success getAllVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateVisit", authenticateToken, async function (req, res) {
    try {
        let visit_id = req.body.visit_id;
        let result = await CustomerVisits.updateOne({ 'visit_id': visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteVisit", authenticateToken, async function (req, res) {
    try {
        let visit_id = req.body.visit_id;
        let result = await CustomerVisits.deleteOne({ 'visit_id': visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Customer Visit deleted", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
///////////////////////// -- Schedule Visits code -- /////////////////////////
router.post("/scheduleVisit", authenticateToken, async function (req, res) {
    console.log("Enter: scheduleVisit");
    try {
        let scheduleVisit = new ScheduleVisits(req.body);
        //visitDetail.visit_id = Date.now();
        let result = await scheduleVisit.save();
        console.log("Success");
        response.success(req, res, "Success scheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllScheduleVisits", authenticateToken, async function (req, res) {
    console.log("Enter: getAllScheduleVisits");
    try {
        let result = await ScheduleVisits.find();
        console.log("Success");
        response.success(req, res, "Success getAllScheduleVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getScheduleVisit/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getScheduleVisit");
    try {
        console.log(req.params);
        let result = await ScheduleVisits.findOne({ 'schedule_visit_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getScheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateScheduleVisit", authenticateToken, async function (req, res) {
    try {
        let visit_id = req.body.schedule_visit_id;
        let result = await ScheduleVisits.updateOne({ 'schedule_visit_id': visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateScheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteScheduleVisit", authenticateToken, async function (req, res) {
    try {
        let schedule_visit_id = req.body.schedule_visit_id;
        let result = await ScheduleVisits.deleteOne({ 'schedule_visit_id': schedule_visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Schedule Visit deleted", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
///////////////////////// -- End Schedule Visits code -- /////////////////////////


///////////////////////// -- User Actions code -- /////////////////////////
router.post("/logout", authenticateToken, async function (req, res) {
    console.log("Enter: logout");
    try {
        let userActionObj = {
            action_id: Date.now(),
            /* user_id: req.body.user_id, */
            /*  username: req.body.username, */
            email: req.clientDetails.email,
            action: 'Logout'
        }
        let userAction = new UserActions(userActionObj);
        await userAction.save();
        response.success(req, res, "Success logout", userAction);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllUserActions", authenticateToken, async function (req, res) {
    console.log("Enter: getAllUserActions");
    try {
        let result = await UserActions.find();
        console.log("Success");
        response.success(req, res, "Success getAllUserActions", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addExpenseItem", authenticateToken, async function (req, res) {
    console.log("Enter: addExpenseItem");
    try {
        let expenseItemDetail = new ExpenseItemSchema(req.body);
        expenseItemDetail.item_id = Date.now();
        let result = await expenseItemDetail.save();
        console.log("Success");
        response.success(req, res, "Success addExpenseItem", expenseItemDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/updateExpenseItem", authenticateToken, async function (req, res) {
    try {
        let item_id = req.body.item_id;
        let result = await ExpenseItemSchema.updateOne({ 'item_id': item_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteExpenseItem", authenticateToken, async function (req, res) {
    try {
        let item_id = req.body.item_id;
        let result = await ExpenseItemSchema.deleteOne({ 'item_id': item_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getAllExpenseItem", authenticateToken, async function (req, res) {

    console.log("Enter: getAllExpenseItem");
    try {
        let result = await ExpenseItemSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getExpenseItem", authenticateToken, async function (req, res) {

    console.log("Enter: getExpenseItem");
    try {
        let result = await ExpenseItemSchema.find();
        console.log("Success");
        response.success(req, res, "Success getExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getTotalExpenses", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalExpenses");
    try {
        console.log(req.params);
        let result = await ExpenseDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalExpenses", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getAllExpenseForEmail", authenticateToken, async function (req, res) {
    console.log("Enter: getAllExpenseForEmail");
    try {
        /* let email = req.clientDetails.email; */
        
        /* let result = await ExpenseDetail.find({ "expense_added_by_email": email }); */
        let result = await ExpenseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpenseForEmail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllExpense", authenticateToken, async function (req, res) {
    console.log("Enter: getAllExpense");
    try {
        let result = await ExpenseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addExpense", authenticateToken, async function (req, res) {
    console.log("Enter: addExpense");
    try {
        let expenseDetail = new ExpenseDetail(req.body);
        expenseDetail.expense_id = Date.now();
        let result = await expenseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addExpense", expenseDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteExpense", authenticateToken, async function (req, res) {
    try {
        let expense_id = req.body.expense_id;
        let result = await ExpenseDetail.deleteOne({ 'expense_id': expense_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getExpense/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getExpense");
    try {
        console.log(req.params);
        let result = await ExpenseDetail.findOne({ 'expense_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/updateExpense", authenticateToken, async function (req, res) {
    try {
        let expense_id = req.body.expense_id;
        let result = await ExpenseDetail.updateOne({ 'expense_id': expense_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getUserFromEmail/:email", async function (req, res) {
    console.log("Enter: getUserFromEmail.....");
    try {
        console.log(req.params);
        let result = await UserDetail.findOne({ 'email': req.params.email }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getUserFromEmail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

///////////////////////// -- End User Actions code -- /////////////////////////
//////////
router.post("/checkInOutAction", authenticateToken, async function (req, res) {
    console.log("Enter: checkInOutAction");
    try {
        let userActionObj = {
            status_id: Date.now(),
            email: req.clientDetails.email,
            action: req.body.checkStatus,
        }
        let userAction = new CheckInOutStatus(userActionObj);
        await userAction.save();
        response.success(req, res, "Success Action", userAction);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllCheckInOut", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCheckInOut");
    try {
        let result = await CheckInOutStatus.find();
        console.log("Success");
        response.success(req, res, "Success getAllCheckInOut", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/dashboardSearch", authenticateToken, async function (req, res) {
    console.log("Enter: dashboardSearch");
    try {
        console.log(req.params);
        let dashObj = [];
        dashObj.push({
            "label": "users",
            "value": await UserDetail.countDocuments(),
            "image": serverURL + "/images/Users.png"
        });
        dashObj.push({
            "label": "quotes",
            "value": await QuoteDetail.countDocuments(),
            "image": serverURL + "/images/Quotes.png"
        });
        dashObj.push({
            "label": "products",
            "value": await Productdetail.countDocuments(),
            "image": serverURL + "/images/Products.png"
        });
        dashObj.push({
            "label": "customers",
            "value": await VendorDetail.countDocuments(),
            "image": serverURL + "/images/Customers.png"
        });
        dashObj.push({
            "label": "visits",
            "value": await CustomerVisits.countDocuments(),
            "image": serverURL + "/images/Visits.png"
        });
        dashObj.push({
            "label": "expenses",
            "value": await ExpenseDetail.countDocuments(),
            "image": serverURL + "/images/Expenses.png"
        });
        console.log("Success");
        response.success(req, res, "Success dashboardSearch", dashObj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/* router.get("/dashboardSearch", authenticateToken, async function (req, res) {
    console.log("Enter: dashboardSearch");
    try {
        console.log(req.params);

        let dashObj = [{
                
            "usersLabel": "Total Users",
            "usersValue": 0,
            "usersImage": serverURL + "/images/Users.png"
            
            },
            {
            "quotesLabel": "Total Quotes",
            "quotesValue": 0,
            "quotesImage": serverURL + "/images/Quotes.png",
            },
            {
            "customersLabel": "Total Customers",
            "customersValue": 0,
            "customersImage": serverURL + "/images/Vendors.png",
            },
            {
            "visitsLabel": "Total Visits",
            "visitsValue": 0,
            "visitsImage": serverURL + "/images/Visits.png",
            },
            {
            "productsLabel": "Total Produts",
            "productsValue": 0,
            "productsImage": serverURL + "/images/Products.png",
            },
            {
            "expensesLabel": "Total Expenses",
            "expensesValue": 0,
            "expensesImage": serverURL + "/images/Expenses.png"
            }
            ]
                
        
        dashObj.quotesValue = await QuoteDetail.countDocuments();
        dashObj.productsValue = await Productdetail.countDocuments();
        dashObj.customersValue = await VendorDetail.countDocuments();
        dashObj.visitsValue = await CustomerVisits.countDocuments();
        dashObj.expensesValue = await ExpenseDetail.countDocuments();
        console.log("dashObj::", dashObj);
        console.log("Success", dashObj);
        response.success(req, res, "Success dashboardSearch", dashObj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
 */

//authenticate jwt token
function authenticateToken(req, res, next) {
    let header = req.headers["authorization"];
    let token = header && header.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    // console.log("TOKEN 1:", token);
    // let decoded = jwt.decode(token);
    // console.log("DECODED:", decoded);
    jwt.verify(token, SECRET, (err, clientDetails) => {
        if (err) return res.sendStatus(403);
        req.clientDetails = clientDetails;
        next();
    });
}

///////////////////////////

module.exports = router;
