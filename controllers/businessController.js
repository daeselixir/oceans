const Business = require('../models/business')

const catchAsync = require('../validator/catchAsync');
const AppError = require('../validator/appError');


exports.businessId = catchAsync(async (req, res, next) => {
    // console.log(req.paramas)
    const business = await Business.findById(req.params.businessId)
    if (!business) {
        return next(new AppError('No business whit that Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            business
        }
    })
})

exports.listBusiness = (req, res) => {
    Business.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }
        res.json(data)
    })
}

exports.createBusiness = catchAsync(async (req, res) => {
    const newBusiness = await Business.create(req.body)

    res.stauts(201).json({
        status: 'sucess',
        data: {
            business: newBusiness
        }
    })
})

exports.updateBusiness = catchAsync(async (req, res) => {
    const business = await Business.findOneAndUpdate(req.params.businessId, req.body, {
        new: true,
        runValidators: true
    })
    if (!business) {
        return next(new AppError('No business found with that Id', 400))
    }
    res.status(200).json({
        status: 'sucess',
        data: {
            business
        }
    })
})

exports.deleteBusiness = catchAsync(async (req, res, next) => {
    const business = await Business.findByIdAndDelete(req.params.businessId);

    if (!business) {
        return next(new AppError('No business found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});


// exports.createBusiness = (req, res, next) => {
//     const business = new Business(req.body)
//     business.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err.message
//             })
//         }
//         res.json({
//             data
//         })
//     })
// }