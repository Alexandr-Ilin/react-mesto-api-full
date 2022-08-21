const allowedCors = [
  'http://ilin.nomoredomains.sbs',
  'https://ilin.nomoredomains.sbs',
  'http://localhost:3000',
  // 'http://localhost:3001',
];

const corsOptions = {
  credentials: true,
  origin: function corsOk(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsOptions;
