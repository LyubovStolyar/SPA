const jwt = require('jsonwebtoken');
const config = require('../config/dev');

// import { HttpHeaders } from '@angular/common/http';

// let header = new HttpHeaders();
// header.set('Access-Control-Allow-Origin', '*');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        req.user = jwt.verify(token, config.JWT_SECRET);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send('Access denied. go to /signin');
    }
}