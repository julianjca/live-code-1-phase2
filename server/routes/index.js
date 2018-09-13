const router = require('express').Router();
const { register,login,auth } = require('../controllers/userController');

router.post('/users/register',register);
router.post('/users/login',login);
router.get('/users/auth',auth);

module.exports = router;