const JWT_SECRET_KEY = require('../node_modules/json-server-auth/dist/constants').JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');

let profileApi = {};

profileApi.get = (req, res) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      const {db} = req.app;
      const user = db.get('users').find({id: +data.sub}).value();
      const {id, password, ...profile} = user;

      res.json(profile)
    } catch (error) {
      res.json({error})
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

module.exports = profileApi;
