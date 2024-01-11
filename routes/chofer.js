const { Router } = require('express');

const { choferGet,
        choferPost,
        choferPut,
        choferDelete
      } = require('../controllers');




const router = Router();

router.get('/', choferGet);

router.put('/', choferPut);

router.post('/', choferPost);

router.delete('/:id', choferDelete);

module.exports = router;