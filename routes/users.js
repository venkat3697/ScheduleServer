var express = require('express');
const { RegisterUser, LoginUser } = require('../controllers/usermanagement');
const { CreateEvent, getEventsByUserId,getEventsById } = require('../controllers/events');
var router = express.Router();

/* GET users listing. */
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/event',CreateEvent)
router.get('/event/:eventId',getEventsById)
router.get('/userevents/:userId',getEventsByUserId)


module.exports = router;
