const jwt = require('jsonwebtoken');

const jwtFirma = 'ContraseñaDeLaFirma';

const jwtoken = {};

jwtoken.token =  (user) => {
    return jwt.sign(user, jwtFirma);
}

jwtoken.verify = (req, res, next) => {
  try {
    const encoded = jwt.verify(req.headers.token, jwtFirma);
    req.user = encoded;
    next();
  } catch {
    res.status(401).json({
        auth: false,
        message: 'Token invalid'
    });
  }
}

jwtoken.isAdmin = (req, res, next) => {
  if(req.user.tipo === 'admi'){
    next();
  } else {
    res.status(404).json('Usuario no autorizado');
  }
}

module.exports = jwtoken;

