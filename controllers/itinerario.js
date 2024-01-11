    const { response, request } = require('express');
    const Itinerario = require('../models/itinerario');
    const { ObjectId } = require('mongodb');

    const crearItinerario = async (req = request, res = response) => {
    try {
        const { idBus, fechaViaje } = req.body;

        const itinerario = new Itinerario({
        idBus,
        fechaViaje,
        });

        await itinerario.save();

        res.status(201).json({
        success: true,
        message: 'Se creó el itinerario correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const asignarChofer = async (req, res) => {
    try {
        const { idItinerario, idChofer } = req.body;

        await Itinerario.findByIdAndUpdate(idItinerario, { idChofer });

        res.status(200).json({
        success: true,
        message: 'Se asignó el chofer correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const buscarItinerario = async (req, res) => {
    try {
        const { fecha } = req.body;

        const itinerarios = await Itinerario.find({ fechaViaje: fecha });

        res.json(itinerarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const registrarPasajero = async (req, res) => {
    try {
        const { idItinerario, idAsiento, dni, nombres } = req.body;

        await Itinerario.findByIdAndUpdate(idItinerario, {
        $push: { detalle: { idAsiento, dni, nombres } },
        });

        res.status(201).json({
        success: true,
        message: 'Se registró el pasajero correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const editarPasajero = async (req, res) => {
    try {
        const { idItinerario, idAsiento, dni, nombres } = req.body;

        await Itinerario.updateOne(
        { 'detalle.idAsiento': idAsiento },
        { $set: { 'detalle.$.dni': dni, 'detalle.$.nombres': nombres } }
        );

        res.status(200).json({
        success: true,
        message: 'Se editó el pasajero correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const buscarPasajero = async (req, res) => {
    try {
        const { idItinerario } = req.body;

        const itinerario = await Itinerario.findById(idItinerario);

        res.json(itinerario.detalle);
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    const eliminarPasajero = async (req, res) => {
    try {
        const { idItinerario } = req.body;

        await Itinerario.findByIdAndUpdate(idItinerario, { detalle: [] });

        res.json({
        success: true,
        message: 'Se eliminó el pasajero correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: 'Error en el servidor',
        });
    }
    };

    module.exports = {
    crearItinerario,
    asignarChofer,
    buscarItinerario,
    registrarPasajero,
    editarPasajero,
    buscarPasajero,
    eliminarPasajero,
    };
