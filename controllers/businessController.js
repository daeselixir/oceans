const Business = require("../models/business");
const catchAsync = require("../validator/catchAsync");
const AppError = require("../validator/appError");

exports.businessId = catchAsync(async (req, res, next) => {
  const business = await Business.findById(req.params.busId);

  if (!business) {
    return next(new AppError("No business whit that Id", 404));
  }

  req.params = business;

  next();
});

exports.readBusinessId = (req, res) => {
  return res.json(req.params);
};

exports.listBusiness = (req, res) => {
  Business.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(data);
  });
};

exports.createBusiness = catchAsync(async (req, res) => {
  const newBusiness = await Business.create(req.body);

  res.status(201).json({
    status: "sucess",
    data: {
      business: newBusiness,
    },
  });
});

exports.updateBusiness = catchAsync(async (req, res) => {
  const business = await Business.findOneAndUpdate(req.params.busId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!business) {
    return next(new AppError("No business found with that Id", 400));
  }
  res.status(200).json({
    status: "sucess",
    data: {
      business,
    },
  });
});

exports.deleteBusiness = catchAsync(async (req, res) => {
  const business = await Business.findByIdAndDelete(req.params.busId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
