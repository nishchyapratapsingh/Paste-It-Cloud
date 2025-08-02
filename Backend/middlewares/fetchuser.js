var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next)=> {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({error: "Invalid token"});

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const userId = data.userId;
        req.userId= userId;
        next();
    } catch (error) {
        return res.status(401).json({error});
    }

}

module.exports = fetchuser;
