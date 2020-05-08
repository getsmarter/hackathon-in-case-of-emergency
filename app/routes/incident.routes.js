const express = require('express');
const router = express.Router();
const incident = require('../controllers/incident.controller.js');


router.post('/incidents', incident.create);

router.get('/organizations/:organizationId/incidents', incident.findAll);

router.get('/incidents/:incidentId', incident.findOne);

router.put('/incidents/:incidentId', incident.update);

router.delete('/incidents/:incidentId', incident.delete);

module.exports = router;
