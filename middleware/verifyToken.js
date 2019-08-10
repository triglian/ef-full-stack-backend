const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authorizationHeader = req.header('Authorization') || '';
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({error: true, message: 'Access Denied'});
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(400).json({error: true, message: 'Invalid Token'});
  }
};
