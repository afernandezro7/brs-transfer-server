/*************************************
*        [USER] CONTROLLERS          *
*------------------------------------*
*           Create USER              *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const bcrypt = require('bcrypt');

// Cargar Models de la BD
const User = require('../models/User');


/*
    [USER] Create USER Controller
*/

const createUser = async( req, res = response)=>{
    
    // leer info del body del request {name,email password}
    const { email, password } = req.body;
    

    try {

        // Verify if the user is registered in database
        let user = await User.findOne( {email} )       
        if( user ){
            
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            });    
           
        }

        // create an intance of the user with the req.body
        user = new User(req.body)

        // Pasword hash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        // Save user in database
        await user.save()
    
        res.status(200).json({
            ok: true,
            msg:'Usuario creado correctamente',
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Internal error, contact admin'
        })
    }
}

module.exports = {
    createUser
    
}