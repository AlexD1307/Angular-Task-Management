const JWT_SECRET_KEY = require('../node_modules/json-server-auth/dist/constants').JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

let user = {};

user.data = (req, res) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      const {db} = req.app;
      const user = db.get('users').find({id: +data.sub}).value();
      const {id, username, avatar } = user;

      res.send({id, username, avatar});
    } catch (error) {
      res.json(error)
    }
  } else {
    res.json({
      error: {
        name: "User not authorized",
        status: 401
      }
    })
  }
};

module.exports = user;
