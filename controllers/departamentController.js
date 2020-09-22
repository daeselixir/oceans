const Departament = require("../models/departament");

const catchAsync = require("../validator/catchAsync");

exports.departamentId = catchAsync(async (req, res, next) => {
  const departament = await Departament.findById(req.params.depId);
  //console.log("el " + departament);
  if (!departament) {
    return res.status(401).json({
      error: "Departament found Id",
    });
  }

  req.params = departament;
  //console.log(req.params);
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
exports.updateDepartament = catchAsync(async (req, res) => {
  const dep = await Departament.findOneAndUpdate(req.params.depId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "sucess",
    data: {
      dep,
    },
  });
});

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