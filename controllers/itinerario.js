const { response, request } = require('express');
const itinerario = require('../models/itinerario');
const { ObjectId } = require('mongodb');
const itinerario = require('../models/itinerario');

const crearItinerario = async (req= requerst, res = response)=>{
    try{
        let{idBus, fechaViaje} = req.body;
        
    }
}