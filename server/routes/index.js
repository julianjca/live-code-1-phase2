const router = require('express').Router();
const { register,login,auth } = require('../controllers/userController');

router.post('/register',register);
router.post('/login',login);
router.get('/auth',auth);

module.exports = router;