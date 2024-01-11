const {Router} = require('express');

const { crearItinerario,
        asignarChofer,
        buscarItinerario,
        registrarPasajero,
        editarPasajero,
        buscarPasajero,
        eliminarPasajero
      } = require('../controllers');

const router = Router();

router.post('/',crearItinerario);
router.post('/', asignarChofer);
router.put('/', buscarItinerario);
router.post('/', registrarPasajero);
router.put('/', editarPasajero);
router.get('/',buscarPasajero);
router.delete('/',eliminarPasajero);

module.exports = router;