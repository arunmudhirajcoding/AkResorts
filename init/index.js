require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data } = require("./data");

const MONGO_URL = process.env.ATLASDB_URL;

main()
	.then(() => {
		console.log("conneted to db");
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
	await Listing.deleteMany({});
	let data2 = data.map((obj) => ({
		...obj,
		owner: "6840820117768d5355e3b77a",
	}));
	await Listing.insertMany(data2);
	console.log("data was initialized");
};

initDB();
