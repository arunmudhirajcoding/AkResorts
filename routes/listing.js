const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/new", isLoggedIn, listingController.renderNewForm);
//show all listings
router
	.route("/")
	.get(warpAsync(listingController.index))
	.post(
		isLoggedIn,
		upload.single("listing[image]"),
		validateListing,
		warpAsync(listingController.newlisting)
	);

//form to create

//edit listing
router.get("/:id/edit", isLoggedIn, warpAsync(listingController.editListing));

//delete
router.delete(
	"/:id/delete",
	isLoggedIn,
	isOwner,
	warpAsync(listingController.deleteListing)
);
//update
router
	.route("/:id")
	.get(warpAsync(listingController.showListing))
	.put(
		isLoggedIn,
		isOwner,
		upload.single("listing[image]"),
		validateListing,
		warpAsync(listingController.editedListing)
	);

//show listing

module.exports = router;
