const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const {
	renderAddAdmin,
	addAdmin,
	renderAdmins,
	deleteAdmin,
	editAdmin,
	renderEditAdmin,
} = require('../controllers/admin.controller');

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/add', renderAddAdmin);
router.post('/add', addAdmin);
router.get('/', isLoggedIn, renderAdmins);
router.get('/delete/:id', deleteAdmin);
router.get('/edit/:id', renderEditAdmin);
router.post('/edit/:id', editAdmin);

module.exports = router;
