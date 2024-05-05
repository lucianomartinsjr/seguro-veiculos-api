const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');

// Rota GET para obter o CREDIT_SCORE
router.get('/credit-score', insuranceController.getCreditScore);

module.exports = router;
