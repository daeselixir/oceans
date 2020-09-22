const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const catchAsync = require("../validator/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const user = new User(req.body);
  await user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
});
//Ingresar
exports.signin = (req, res) => {
  const { email, password } = req.body;
  //console.log(req.profile);
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that emails does not exist.Please signup",
        });
      }
      // if user is found make sure the email and password match
      // create authenticate method in user model

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password match",
        });
      }
      // generate a signed token with user id and secret
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET
      );
      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, {
        expire: new Date() + 9999,
      });

      // return response with user and token to frontend client
      const { _id, name, email, role } = user;
      return res.json({
        token,
        user: {
          _id,
          email,
          name,
          role,
        },
      });
    }
  );
};

//Para salir de la aplicacion y limpiar la cookie
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout success",
  });
};
//Requiere la informacion o firma del token
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile);
  //console.log(req.auth);
  // console.log(req.profile._id);
  console.log(req.auth._id);

  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  //console.log(req.profile.role);
  //console.log(req.profile);
  if (req.profile.role === 0) {
    // console.log(req.profile.role);

    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
