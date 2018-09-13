const router = require('express').Router();
const { register,login,auth,translate } = require('../controllers/userController');

router.post('/users/register',register);
router.post('/users/login',login);
router.get('/users/auth',auth);
router.post('/translate',translate);

module.exports = router;