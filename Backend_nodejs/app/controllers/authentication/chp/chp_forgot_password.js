const { Chp } = require('../../../models/user_models/chp_model');
const Helpers = require('../../../util/helpers');

// Create an instance of the Helpers class
const helper = new Helpers();

// Forgot Password
exports.chpForgotPassword = async (req, res) => {
  helper.log(req);
  
  const { email } = req.body; 

  try {
    // Find the user associated with the provided email
    const chp = await Chp.findOne({ where: { email: email } });

    if (!chp) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Generate reset token
    const resetToken = helper.generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Update user with reset token
    await chp.update({
      resetToken: resetToken,
      resetTokenExpiry: resetTokenExpiry
    });

    // Send reset password email
    // TODO: Implement email sending functionality

    return res.status(200).json({ 
      message: 'Password reset instructions sent to email',
      resetToken: resetToken // In production, don't send this in response
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
