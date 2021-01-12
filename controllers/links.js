/*************************************
*        [LINKS] CONTROLLERS          *
*------------------------------------*
*           Create Link              *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const shortid = require('shortid');
const bcrypt = require('bcrypt');

// Cargar Models de la BD
const Link = require('../models/Link')

/*
    [LINKS] Create Link Controller
*/
const createLink = async( req, res = response)=>{

    const { original_name, name } = req.body;

    //  Create link instance
    const link = new Link({original_name, name});
    link.url   = shortid.generate();


    //  If user is Authenticated
    if(req.tokenInfo){
        const { password, downloads} = req.body;
        
        link.downloads = downloads || 1;
        link.author = req.tokenInfo.id;

        if(password){
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt)
            link.password = passwordHashed;
        }
        
    };

    try {
        //  Save link in database
        await link.save()

        res.status(200).json({
            ok: true,
            msg:'Enlace creado correctamente',  
            link     
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Internal error, contact admin'
        })
    }
   
    
}

/*
    [LINKS] Get All Links Controller
*/
const getAllLink = async( req, res = response )=>{
   
    try {
        const links = await Link.find().select('url -_id');  
        res.status(200).json({
            ok: true,
            msg:'Enlaces disponibles',
            links
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Internal error, contact admin'
        })
    }
}

/*
    [LINKS] Get Individual Link Controller
*/
const getLink = async( req, res = response)=>{

    try {
        
        const link = await Link.findOne({url:req.params.url})

        if(!link){
            return res.status(404).json({
                ok: false,
                msg:'Enlace no encontrado',    
            }) 
        }

        res.status(200).json({
            ok: true,
            msg:'Enlace obtenido correctamente',  
            link,
            password: false   
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Internal error, contact admin'
        })
    }

}



module.exports = {
    createLink,
    getLink,
    getAllLink  
}

