const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const catchAsync = require('../validator/catchAsync');
const AppError = require('../validator/appError');