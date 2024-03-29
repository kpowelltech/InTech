/* ==== External Modules ==== */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./models")


/* ==== Internal Modules ==== */
const controllers = require("./controllers");

/* ==== Instanced Modules ==== */
const app = express();

/* =========================== 
         Configuration
==============================*/

// use the env port OR the port 4000
const PORT = process.env.PORT || 3000;

// EJS is the view engine.  Will need it for views
app.set("view engine", "ejs");

/* =========================== 
         Middleware
==============================*/

// Public folder middleware
app.use(express.static(__dirname + "/public"));
// body data middleware
app.use(express.urlencoded({ extended: true }));


// method override middleware
app.use(methodOverride("_method"));

// Session middleware
app.use(session({
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
  secret: "Super Secret Waffles",
  reseave: false,
  saveUninitialized: false,
  cooke: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // One week cookie age
  }
}))
// this adds user credentials to all ejs files
app.use(function (req, res, next) {
  app.locals.user = req.session.currentUser;
  next()
})


// authRequried middleware
const authRequired = function (req, res, next) {
  if(req.session.currentUser) {
    return next()
  }
  return res.redirect("/login")
}


// Logger Middleware - Helper tool
app.use(function (req, res, next) {
  console.log(req.session);
  console.log(`${req.method} - ${req.url}`);
  next();
});


/* =====================================================================================================================
                                                    Routes & Controllers
========================================================================================================================*/

app.use("/", controllers.auth)

/* =========================== 
        Home Route
==============================*/

app.get("/", function (req, res) {
  return res.render("landing")
})



app.get("/home", async function (req, res) {

  try {
  const foundUser = await db.User.findById(req.session.currentUser.id)
  const foundjobListings = await db.JobListings.find({}).populate("company")
  const queries = req.query
  console.log(queries);


  
  const context = {
        user: req.session.currentUser,
        profile: foundUser,
        joblistings: foundjobListings,
        queries: queries
      }

  res.render("home", context);

    } catch (err) {
      console.log(err);
      return res.send(err);
    }
});

/* =========================== 
        Saved Jobs Routes
==============================*/

app.get("/:id/saved", async function (req, res) {

  const foundjobListings = await db.JobListings.find({}).populate("company")
  
  await db.User.findById(req.params.id, function (err, foundUser) {
    if (err) return res.send(err)

    const context = {user: foundUser,
                    joblisting: foundjobListings}

    console.log(req.body);
    return res.render("savedJobs", context)
  }).populate("savedJobs").populate("company")

})

app.put("/:id/saved", async function (req, res) {

  console.log(req.body);
  
  db.User.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
              savedJobs: req.body.jobId
      },
    },
    {new: true},

    function (err, updatedUser) {
      if (err) return res.send(err);
      return res.redirect(`/home`)
    }
  ).populate("joblisting")
})

app.delete("/:id/saved", async function (req, res) {

  const foundUser = await db.User.findById(req.params.id)
  foundUser.savedJobs.splice(req.body.savedJobIndex, 1)
  foundUser.save()

  return res.redirect(`/${foundUser._id}/saved`)
})

/* =========================== 
    Edit User Profile routes
==============================*/

// Route edits the user profile - presentational 
app.get("/:id/edit", async function (req, res) {
  
  await db.User.findById(req.params.id, function (err, foundUser) {
    if (err) return res.send(err)

    const context = {user: foundUser}
    console.log(foundUser);
    return res.render("edit", context)
  })

})

// Route that updates the database
app.put("/:id", function (req, res) {

  let skill = req.body.skills.split(",");
  req.body.skills = skill
  console.log(req.body.skills);

  db.User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body,
      },
    },
    {new: true},

    function (err, updatedUser) {
      if (err) return res.send(err);
      return res.redirect("/home")
    }
  )
});


/* =========================== 
      Server Listener
==============================*/

app.listen(PORT, function () {
  console.log(`InTech application is live at http://localhost:${PORT}/`);
});