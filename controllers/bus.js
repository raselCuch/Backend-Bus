const {response, request} = require('express');
const Bus = require('../models/bus');
const { ObjectId } = require('mongodb'); // Importa ObjectId de mongodb

const busGet = async (req=request, res=response) => {

    const buses= await Bus.find();

    res.json(buses);
  }

const busPost = async (req, res) =>  {
    
    try {

        let {placa, marca, modelo, asientos}= req.body;

        const placaEncontrada = await Bus.find({placa});

        if(placaEncontrada.length>0)
        return res.status(404).json({
            success:false,
            message:"El numero de placa ya existe"
        })

        let cantidad = asientos;

        asientos = [];

        for(i=1; i<= cantidad; i++){
            asientos.push({
                idAsiento: new ObjectId(),
                correlativo:i
            })
        }
        

        const bus = new Bus({placa, marca, modelo, asientos});
        
    
        await bus.save();

        res.status(201).json({
            success:true,
            message:"Se registro correctamente"
        })
    } catch (error) {
        console.log(error)
    }
    
}


const busPut =  async (req, res=response) => {
    
    
    
    res.status(200).json(
        {
            success:true,
            message:"Se modifico correctamente"
        }
    )
}


const busDelete= async (req, res) => {
    // const {id} = req.params;

    
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    res.json({
        success:true,
        message:"Se elimino correctamente"
    })
  }

  module.exports={
    busGet,
    busPost,
    busPut,
    busDelete
  }