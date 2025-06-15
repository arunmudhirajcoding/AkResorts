const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.validateReview = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	console.log(error);
	if (error) {
		let errMsg = error.details.map((ele) => ele.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};
 

//server vaildation as middleware
module.exports.validateListing = (req, res, next) => {
	let { error } = listingSchema.validate(req.body);
	console.log(error);
	if (error) {
		let errMsg = error.details.map((ele) => ele.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.redirectUrl = req.originalUrl;
		// console.log(req.session.redirectUrl);

		req.flash("error", "you must be logged in to create listing!");
		return res.redirect("/login");
	}
	next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
	
	if (req.session.redirectUrl) {
		console.log("url"+req.session.redirectUrl);
		
		res.locals.redirectUrl = req.session.redirectUrl;
	}
	next();
};

module.exports.isOwner =async (req, res, next) => {
	let { id}= req.params
	let listing = await Listing.findById(id)
	if (res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)) {
		req.flash("error", "You not a owner of this listing ");
		return res.redirect("/listings/" + id);
	}
	next()
};
