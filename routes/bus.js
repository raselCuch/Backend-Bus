const {Router} = require('express');

const { busGet,
        busPut, 
        busPost, 
        busDelete
         } = require('../controllers');

    


const router= Router();

router.get('/', busGet);

router.put('/', busPut);

router.post('/', busPost );

router.delete('/:id', busDelete  );

module.exports = router;