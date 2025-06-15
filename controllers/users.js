const user = require("../models/user");

module.exports.SignUpForm =(req, res) => {
	res.render("users/signup.ejs");
}
module.exports.signUp =async (req, res) => {
		try {
			let { username, email, password } = req.body;
			let newUser = new user({ email, username });
			const registerUser = await user.register(newUser, password);
			req.login(registerUser, (err) => {
				if (err) {
					return next(err);
				}
				console.log(registerUser);
				req.flash("success", "welcome to wanderLust!");
				res.redirect("/listings");
			});
		} catch (e) {
			req.flash("error", e.message);
			res.redirect("/signup");
		}
	}
module.exports.loginForm =(req, res) => {
	res.render("users/login.ejs");
}
module.exports.login = async (req, res) => {
		req.flash("success", "welcome back to wanderLust!");
		
		let redirectUrl = res.locals.redirectUrl || "/listings"
		res.redirect(redirectUrl);
	}

module.exports.logout = async (req, res) => {
		req.flash("success", "welcome back to wanderLust!");
		
		let redirectUrl = res.locals.redirectUrl || "/listings"
		res.redirect(redirectUrl);
	}