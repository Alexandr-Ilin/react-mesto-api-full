const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthtorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  const { jwt: token } = req.cookies;
  if (!token) {
    next(new UnauthtorizedError('Вы не авторизированы'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthtorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
