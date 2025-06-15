const express = require("express");
const user = require("../models/user");
const warpAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const router = express.Router();
const userController = require("../controllers/users");

router
	.route("/signup")
	.get(userController.SignUpForm)
	.post(warpAsync(userController.signUp));

	
router
	.route("/login")
	.get((req, res) => {
		res.render("users/login.ejs");
	})
	.post(
		saveRedirectUrl,
		passport.authenticate("local", {
			failureRedirect: "/login",
			failureFlash: true,
		}),
		async (req, res) => {
			req.flash("success", "welcome back to wanderLust!");

			let redirectUrl = res.locals.redirectUrl || "/listings";
			res.redirect(redirectUrl);
		}
	);

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "you are logged out!");
		res.redirect("/listings");
	});
});

module.exports = router;
