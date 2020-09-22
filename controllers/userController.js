const User = require("../models/user");
const catchAsync = require("../validator/catchAsync");

exports.userById = async (req, res, next, id) => {
  // console.log(req.profile);
  await User.findById(id).exec((err, user) => {
    //console.log(req.profile);
    if (err || !user) {
      return res.status(400).json({
        // error: "User not found",
        error: err,
      });
    }
    req.profile = user;
    console.log(req.params);

    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.profile._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
exports.delete = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
