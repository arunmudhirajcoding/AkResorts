const express = require("express");
const warpAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const router = express.Router({mergeParams:true});
const reviewControler = require("../controllers/reviews.js")


//reviews
router.post(
	"/",
	isLoggedIn,
	validateReview,
	warpAsync(reviewControler.createReview)
);

// Delete Review Route
router.delete(
	"/:reviewId",
	isLoggedIn,
	warpAsync(reviewControler.destroyReview)
);

module.exports = router