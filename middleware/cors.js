module.exports = function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_DOMAIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
};
