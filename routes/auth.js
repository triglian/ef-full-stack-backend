const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../lib/validation');

router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }

  const doesEmailExist = await User.findOne({email: req.body.email});

  if (doesEmailExist) {
    return res.status(400).json({
      error: true,
      message: 'Email already exists',
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    return res.status(400).json({
      error: true,
      // in production we should be careful not to reveal
      // implementation details and expose ourselves to security
      // flaws
      message: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }

  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return res.status(400).json({
      error: true,
      message: 'Wrong email and/or password',
    });
  }

  const isPasswordValid = await user.isValidPassword(req.body.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      error: true,
      message: 'Wrong email and/or password',
    });
  }
  const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
  return res.header('Authorization', `Bearer ${token}`).json({
    name: user.name,
    accessToken: token,
  });
});

module.exports = router;
