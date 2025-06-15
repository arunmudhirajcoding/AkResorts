const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

// const geocodingClient = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });

module.exports.index = async (req, res) => {
	const allListings = await Listing.find({});
	res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
	res.render("listings/new.ejs");
};

module.exports.newlisting = async (req, res) => {
	// if (!req.body.listing) {
	// 	throw new ExpressError(400,"Send vaild dara for listing");
	// }

	// let result = listingSchema.validate(req.body)
	// console.log(result);
	// if (result.error) {
	// 	throw new ExpressError(400,result.error)
	// }

	//map
	// let response = await geocodingClient
	// 	.forwardGeocode({
	// 		query: req.body.listing.location,
	// 		limit: 1,
	// 	})
	// 	.send()
		

	let url = req.file.path;
	let filename = req.file.filename;
	let listing = req.body.listing;
	const newlisting = new Listing(listing);
	newlisting.owner = req.user._id;
	newlisting.image = { url, filename };
	// newlisting.geometry = response.body.features[0].geometry;
	await newlisting.save();
	req.flash("success", "listing is created Successfully!");
	res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id);
	let originalImageUrl = listing.image.url;
	originalImageUrl.replace("/upload", "/upload/h_300,w_250");
	res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.editedListing = async (req, res) => {
	if (!req.body.listing) {
		throw new ExpressError(400, "Send vaild dara for listing");
	}
	let { id } = req.params;
	let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
	if (typeof req.file !== "undefined") {
		let url = req.file.path;
		let filename = req.file.filename;
		listing.image = { url, filename };
		await listing.save();
	}
	res.redirect("/listings/" + id);
};

module.exports.deleteListing = async (req, res) => {
	let { id } = req.params;
	await Listing.findByIdAndDelete(id);

	res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id)
		.populate({ path: "reviews", populate: { path: "author" } })
		.populate("owner");
	if (!listing) {
		req.flash("error", "Listing you requested for does not exist!");
		res.redirect("/listings");
	}
	res.render("listings/show.ejs", { listing });
};
