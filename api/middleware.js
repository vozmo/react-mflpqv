const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_password";

module.exports = (req, res, next) => {
    var token = req.body['x-access-token'] || req.query['x-access-token'] || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if (err) return res.status(403).send({ 
                    success: false, 
                    message: 'Failed to authenticate token.' 
                    });
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else return res.status(403).send({
            success: false,
            message: 'No token provided.'
            });
    
};
