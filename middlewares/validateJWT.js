const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response , next) => {

    // token headers
    const token = req.header('token');

    // validate token coming in the header
    if(token){
        
        try {
            
            // validar que  el token sea correcto
            const payloadJWT = jwt.verify( token, process.env.SECRET_JWT_SEED )
    
            // imponerle al body un info del usuario para que el controller lo renueve
            req.tokenInfo = payloadJWT
                
        } catch (error) {
            console.log(error);
            console.log('Tóken no válido');
            
        }
    }

    next()
}

module.exports = {
    validateJWT
}