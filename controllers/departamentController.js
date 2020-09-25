const Departament = require("../models/departament");
const catchAsync = require("../validator/catchAsync");
const AppError = require("../validator/appError");

exports.departamentId = catchAsync(async (req, res, next) => {
  const departament = await Departament.findById(req.params.depId);

  if (!departament) {
    return next(new AppError("No departament id ", 404));
  }

  req.params = departament;

  next();
});

exports.readId = (req, res) => {
  return res.json(req.params);
};

exports.listDepartament = (req, res) => {
  Departament.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(data);
  });
};

exports.createDepartament = catchAsync(async (req, res) => {
  const newDepartament = await Departament.create(req.body);

  res.status(201).json({
    status: "sucess",
    data: {
      business: newDepartament,
    },
  });
});

exports.updateDepartament = (req, res) => {
  const departament = req.params;
  departament.name = req.body.name;

  departament.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.deleteDepartament = catchAsync(async (req, res, next) => {
  let departament = req.params;
  await departament.remove((err, dep) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Departament deleted successfully",
    });
  });
});
