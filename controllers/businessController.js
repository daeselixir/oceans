const Business = require('../models/business')

const catchAsync = require('../validator/catchAsync');

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

exports.createBusiness2 = catchAsync(async (req, res) => {
    const newBusiness = await Business.create(req.body)

    res.stauts(201).json({
        status: 'sucess',
        data: {
            business: newBusiness
        }
    })
})

exports.createBusiness = (req, res, next) => {
    const business = new Business(req.body)
    business.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            })
        }
        res.json({
            data
        })
    })
}