//all imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); // used to override standard post/get methods to put/delete in forms in frontend only for html forms
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
//routes 
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session"); // used to store session data in server or database 
const MongoStore = require("connect-mongo"); // used to store session data in mongodb
const flash = require("connect-flash"); //used to  notification or toaast messages
const passport = require("passport"); // used to authenticate user
const LocalStrategy = require("passport-local"); // used to authenticate user with local strategy (i.e username and password) instead of oAuth like google or facebook. furthur strategy visit https://www.passportjs.org/docs/
const User = require("./models/user.js"); // used to authenticate user with local strategy

const app = express();
if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
} //env use in dev

const dbUrl = process.env.ATLASDB_URL;
const secret = process.env.SECRET;

const store = MongoStore.create({
	mongoUrl: dbUrl,
	crypto: {
		secret //from sessionoptions
	},
	touchAfter: 24 * 3600, //when any changes not done in session, it should not renew until any changes in server
});

store.on("error", (err) => {
	console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
	store,
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	},
};

//must and fundamental
{
	app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "views"));
	app.use(methodOverride("_method"));
	app.engine("ejs", ejsMate);

	app.use(express.static(path.join(__dirname, "/public")));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(session(sessionOptions));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(new LocalStrategy(User.authenticate())); //authenticate user with local strategy
	passport.serializeUser(User.serializeUser()); //store user data in session
	passport.deserializeUser(User.deserializeUser()); //remove data from session

	app.use((req, res, next) => {
		res.locals.success = req.flash("success");
		res.locals.error = req.flash("error");
		res.locals.currUser = req.user;
		//used bcoz we cant access req in ejs
		next();
	});

	const connectDB = async () => {
		try {
			await mongoose.connect(dbUrl);
			console.log("connected");
		} catch (error) {
			console.error(error.message);
			process.exit(1);
		}
	};

	connectDB();
} //

const PORT = 2100;

// app.get("/demouser",async (req,res) => {
// 	let fakeUser = new User({
// 		email:"duruguarun@gmail.com",
// 		username:"arun-kumar",
// 	})
// 	let registerUser = await User.register(fakeUser,"password")
// 	res.send(registerUser)
// })

//routes
// app.js or index.js (your main Express file)

app.get("/", (req, res) => {
	res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//error handling
{
	//page not found
	app.all("*", (req, res, next) => {
		next(new ExpressError(404, "Page Not Found"));
	});

	//error throw
	app.use((err, req, res, next) => {
		let { status = 500, message = "Something went wrong" } = err;
		res.status(status).render("Error.ejs", { message });
		// res.status(status).send(message);
	});
}

app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
