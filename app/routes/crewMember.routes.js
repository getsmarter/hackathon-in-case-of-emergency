const express = require('express');
const router = express.Router();
const crewMember = require('../controllers/crewMember.controller.js');


router.post('/crew-members', crewMember.create);

router.get('organizations/:organizationId/crew-members', crewMember.findAll);

router.get('/crew-members/:crewMemberId', crewMember.findOne);

router.put('/crew-members/:crewMemberId', crewMember.update);

router.delete('/crew-members/:crewMemberId', crewMember.delete);

module.exports = router;
