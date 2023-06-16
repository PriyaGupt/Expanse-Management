const express = require("express");
const { addTransection, getAllTransection,editTransection,deleteTransection } = require("../controllers/transectionControllers");

//router object
const router = express.Router();

//routes
//add transsection Post Method
router.post("/add-transection", addTransection);
router.post("/edit-transection", editTransection);
router.post("/delete-transection", deleteTransection);
//get transection
router.post("/get-transection", getAllTransection);

module.exports = router;
 