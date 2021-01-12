/*************************************
*        [AUTH] CONTROLLERS          *
*------------------------------------*
*               Login                *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const bcrypt = require('bcrypt');

// Cargar Models de la BD
const User = require('../models/User');

// Helpers
const { generateJWT } = require('../helpers/generateJWT');


/*
    [AUTH] Login Controller
*/

const authLogin = async( req, res = response)=>{

    // Verify errors

    // Find User registered
    const {email, password} = req.body

    const userDB = await User.findOne({email})

    if(!userDB){
        return res.status(401).json({
            ok: false,
            msg:'El Usuario no existe'        
        })
    }

    // Verify password
    const isValidPassword = bcrypt.compareSync( password, userDB.password)
        
    if(!isValidPassword){
        return res.status(401).json({
            ok: false,
            msg: 'Pareja de Usuario y/o Contraseña inválido'
        });
    }

    //Generar JWT(JSON WEB TOKEN)
    const token = await generateJWT(userDB.id, userDB.name, email);

    // User authenticated  
    res.status(200).json({
        ok: true,
        msg:'Usuario autenticado correctamente',
        user: userDB,
        token        
    })
}


/*
    [AUTH] Get User Logged Controller
*/

const authUserLogged = async( req, res = response)=>{
   
    // validate token coming in the header
    if(req.tokenInfo){
    
        try {
            // leer info  del request que impuso el middleware validar-jwt
            const { id, name, email } = req.tokenInfo;
            const user = await User.findById(id)

            if(!user){
                return res.status(404).json({
                    ok: false,
                    msg: 'Token Inválido'  
                });
            }

            //Generar JWT(JSON WEB TOKEN)
            const token = await generateJWT(id, name, email)

            res.status(200).json({
                ok: true,
                msg: 'Token was renew successfully',
                user,
                token  
            });

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok: false,
                msg:'Request inválido, Hable con el Admin'
            });
        }
    }
    
}

module.exports = {
    authLogin,
    authUserLogged
    
}