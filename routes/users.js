var express = require('express');
const { RegisterUser, LoginUser } = require('../controllers/usermanagement');
var router = express.Router();

/* GET users listing. */
router.post('/register', RegisterUser);
router.post('/login', LoginUser);

module.exports = router;
