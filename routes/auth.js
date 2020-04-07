var express = require ("express");
var router = express.Router();
var Coding = require("../models/coding.js");
var passport = require("passport");
var Users = require("../models/user");

router.get("/",function(req,res){
    res.render("basic")
})

router.get("/signup",function(req,res){
	res.render("signup.ejs")
})

router.post("/signup",function(req,res){
	var newuser = new Users({username: req.body.username});
	Users.register(newuser, req.body.password, function(err, user){
		if(err){
            req.flash("error",err.message)
			return res.render("signup.ejs")
		}
		passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to XYZ "+req.body.username );
			res.redirect("/");
		})
	})
})

router.get("/login",function(req,res){
	res.render("login.ejs");
})

router.post("/login", passport.authenticate("local",
	{
	 successRedirect: "/",
	failureRedirect: "/login"
	}),
	function(req,res){	
});

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged You Out!");
	res.redirect("/");
});


module.exports = router;
