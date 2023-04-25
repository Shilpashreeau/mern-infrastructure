//* Request handler Logic
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const bcrypt=require("bcrypt");

//* /*-- Helper Functions --*/
function createJWT(user) {
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
}

async function create(req, res) {
    // console.log('[From POST handler]', req.body)
    try {
        //* creating a new user
        const user = await User.create(req.body);
        console.log(user);

        //* creating a new jwt
        const token = createJWT(user);

        res.json(token);
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}


async function login(req, res) {
    //find user in db
    // console.log('[From POST handler]', req.body)
    try {
        // find the user by email who signed up
        const user=await User.findOne({email:req.body.email})
        console.log('[USER FOUND]',user);
   //check if we found an user     
if(!user){

throw Error("User not found!")

}
//if user exist:compare the password

const matched= await bcrypt.compare(req.body.password,user.password);
if(!matched){
throw Error("USer not found!");

}
        //if password is a match create a token
        const token=createJWT(user);
        res.json(token);
        
    } catch (error) {
       res.status(400).json({error:"Check credentials"})
    }
}

async function checkToken(req,res){
console.log(req.user);
res.json(req.exp);

}

module.exports = {
    create,       //i.e create:create
    login, 

    checkToken,
}