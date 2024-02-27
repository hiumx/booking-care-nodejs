const express = require('express');
const router = express.Router()

import enterpriseController from '../controllers/EnterpriseController';

router.get('', enterpriseController.getAllBenefitsDigitalConversions);
router.post('', enterpriseController.createBenefitDigitalConversion);
router.get('/:intendedForCode', enterpriseController.getPackagesDigitalConversionByIntendedFor);

module.exports = router