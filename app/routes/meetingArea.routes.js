const express = require('express');
const router = express.Router();
const meetingArea = require('../controllers/meetingArea.controller.js');


router.post('/meeting-areas', meetingArea.create);

router.get('/meeting-areas/organizations/:organizationId', meetingArea.findAll);

router.get('/meeting-areas/:meetingAreaId', meetingArea.findOne);

router.put('/meeting-areas/:meetingAreaId', meetingArea.update);

router.delete('/meeting-areas/:meetingAreaId', meetingArea.delete);

module.exports = router;
