const express = require('express');
const customers = require('../controllers/customers');
const router = express.Router();

router.get('/', customers.getCustomers);

router.post('/', customers.registerCustomer);
router.delete('/:id', customers.deleteCustomer);
router.put('/', customers.updateCustomer);

module.exports = router;
