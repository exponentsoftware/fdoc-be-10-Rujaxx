const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');

// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.register = (asyncHandler(async(req,res,next) => {
    const { 
        username,
        email,
        password,
        phone,
        role    
    } = req.body ;

    //Create User
    const user = await User.create({ 
        username,
        email,
        password,
        phone,
        role    
    });

    sendTokenResponse(user, 200, res);
}))


// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.login = (asyncHandler(async(req,res,next) => {

    const { email , password} = req.body

     // Validate emil & password
    if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //check user
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    
    //Check if password Mathces
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials',401))
    }

    sendTokenResponse(user, 200, res);
}))

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  })
})



// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  };
  