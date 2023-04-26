//* Routing Logic

const express=require('express');

const router=express.Router();
const userCtrl=require("../../controllers/api/users");
const ensureLoggedIn=require('../../config/ensureLoggedIn');


//* POST
//these two post routes here allows user to navigate without logging in
router.post('/',userCtrl.create);

router.post('/login',userCtrl.login);

//to protect from the users who are not logged in
router.get("/check-token", [ensureLoggedIn],userCtrl.checkToken);


module.exports=router;
