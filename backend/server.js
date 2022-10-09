require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");
const Restaurant = require("./models/restaurant");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5500;;
const connection_string = process.env.REACT_APP_MONGO_KEY;
const key = process.env.REACT_APP_API_KEY;
const axios = require("axios");

mongoose.connect(
  connection_string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongoose connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://jefflwhatsgood.herokuapp.com",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }


//serve front end
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../src/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'src', 'build', '/index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No matching credentials");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// app.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
//   function (req, res) {
//     console.log("success!");
//     res.redirect("http://localhost:3000");
//   }
// );

app.get("/login/success", (req, res) => {
  res.status(200);
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "failure",
  });
});

// app.post("/register", (req, res) => {
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashPw = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashPw,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/getLocation", (req, res) => {
// app.post("/getLocation", (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`;
  const config = { headers: { Authorization: `Bearer ${key}` } };
  axios
    .get(url, config)
    .then((response) => res.send(response.data.businesses))
    .catch((err) => console.log(err));
});

app.post("/getLocationWithAddress", (req, res) => {
// app.post("/getLocationWithAddress", (req, res) => {
  const address = req.body.address;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}`;
  const config = { headers: { Authorization: `Bearer ${key}` } };
  axios
    .get(url, config)
    .then((response) => res.send(response.data.businesses))
    .catch((err) => console.log(err));
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.post("/user", (req, res) => {
  req.logout(function (err) {
    if (err) throw err;
  });
});

// Checks DB if restaurant exists by ID, if so return restaurant data. Not sure if this works. It was based on the User.findOne()
app.post("/checkDB", (req, res) => {
  Restaurant.find({ ID: req.body.id }, async (err, doc) => {
    if (err) throw err;
    else {
      res.json(doc);
    }
  });
});

//Test path, checks to see if we have any restaurant dat
app.get("/check", (req, res) =>
  Restaurant.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error ", error);
    })
);

app.post("/newRestaurant", (req, res) => {
  const newRestaurant = new Restaurant(req.body);
  newRestaurant.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Internal Server Error??" });
    } else {
      res.json({
        msg: "Data saved",
      });
    }
  });
});

//Add New Food Item
app.post("/newFoodItem", (req, res) => {
  const { ID, foodData } = req.body;
  Restaurant.updateOne(
    { ID: ID },
    {
      $push: {
        MenuItems: {
          FoodID: foodData.FoodID,
          FoodName: foodData.FoodName,
          Rating: 0,
          Reviews: [],
        },
      },
    },
    { upsert: true }
  ).then(res.json({ msg: "soemthing happened" }));
});

//Add New Review
app.post("/newReview", (req, res) => {
  const { ID, FoodID, reviewData, newAverageRating } = req.body;
  //Adds review to Restaurant db
  Restaurant.updateOne(
    { ID: ID },
    {
      $push: {
        "MenuItems.$[elem].Reviews": {
          Username: reviewData.Username,
          UserRating: reviewData.UserRating,
          Description: reviewData.Description,
          Date: Date.now(),
        },
      },
      $set: { "MenuItems.$[elem].Rating": newAverageRating },
    },
    {
      arrayFilters: [{ "elem.FoodID": FoodID }],
      multi: false,
    }
  ).then(res.json({ msg: "soemthing happened" }));

  //Adds review to user db
  User.updateOne(
    { username: reviewData.username },
    {
      $push: {
        Reviews: {
          UserRating: reviewData.UserRating,
          Description: reviewData.Description,
          Date: Date.now(),
        },
      },
    }
  );
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
}

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
