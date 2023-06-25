const responseMiddleware = (req, res, next) => {

  res.jsonSuccess = function (data) {
    res.status(200).json(data);
  };

  res.jsonError = function (message, status = 400) {
    res.status(status).json({ error: true, message });
  };

  res.jsonNotFound = function (message = 'The requested data was not found') {
    res.status(404).json({ error: true, message });
  };

  next();
};


export { responseMiddleware };
