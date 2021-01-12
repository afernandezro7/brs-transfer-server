const { response }  = require('express');
const { validationResult } = require('express-validator');


const fieldValidator = (req, res = response , next) =>{


    const errors = validationResult( req )

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            msg: 'No se pudo completar la acción correctamente',
            errors: errors.array(),
            qty_errors: errors.array().length
        })
    }

    next();
}

module.exports = {
    fieldValidator
}