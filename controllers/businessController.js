const Business = require("../models/business");
const catchAsync = require("../validator/catchAsync");
const AppError = require("../validator/appError");

/*exports.businessId = catchAsync(async (req, res, next) => {
  console.log(req.params.busId)
  const business = await Business.findById(req.params.busId);

  if (!business) {
    return next(new AppError("No business whit that Id", 404));
  }

  req.params = business;
  console.log(req.params.busId)

});
*/
exports.businessId = catchAsync(async (req, res, next) => {
  console.log(req.params.busId);
  let business = await Business.findById(req.params.busId);
  //console.log("el " + departament);
  if (!business) {
    return res.status(401).json({
      error: "Departament found Id",
    });
  }

  req.params = business;
  //console.log(req.params);
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

exports.updateBusiness = (req, res) => {
  const business = req.params;
  console.log(business);
  business.rut = req.body.rut;
  business.name = req.body.name;
  business.direction = req.body.direction;

  business.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.deleteBusiness = catchAsync(async (req, res) => {
  const business = await Business.findByIdAndDelete(req.params.busId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
