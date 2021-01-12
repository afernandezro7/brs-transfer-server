const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const Link = require('../models/Link');
const bcrypt = require('bcrypt');

const validatePassword = async( req, res = response, next)=>{

    const link = await Link.findOne({url:req.params.url})

    if(!link){
        return res.status(404).json({
            ok: false,
            msg:'Enlace no encontrado',    
        }) 
    }

    if(link.password){
        return res.status(200).json({
            ok: true,
            msg:'Password encontrado',    
            link: link,
            password:true
        }) 
    }

    next()

        
}

const hashPassword = async( req, res = response, next)=>{

    const url = req.params.url
    const password = req.body.password


    const link = await Link.findOne({url})

    if(!link){
        return res.status(404).json({
            ok: false,
            msg:'Enlace no encontrado',    
        }) 
    }

    // Verify password
    const isValidPassword = bcrypt.compareSync( password, link.password)

    if(!isValidPassword){
        return res.status(401).json({
            ok: false,
            msg:'Pasword incorrecto',    
        }) 
    }

    res.status(200).json({
        ok: true,
        msg:'Pasword correcto',  
        link
    })
}

module.exports={
    validatePassword,
    hashPassword
}