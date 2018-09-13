const router = require('express').Router();
const { add,listAll,remove } = require('../controllers/quotesController');

router.post('/',add);
router.get('/',listAll);
router.delete('/:id',remove);


module.exports = router;