const express = require('express');
const router = express.Router();
const ticketController = require('../../controller/emailController');

router.post('/createTicket' , ticketController.create);//booking service will call this api to enter detail into notificationticket table.

module.exports = router;