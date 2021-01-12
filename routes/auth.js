/****************************************
*          [AUTH] ROUTES                *
*         host + /api/auth              *
*---------------------------------------*  
*        Login : post    '/'            *
*                                       *
*****************************************/

const express = require('express');
const router  = express.Router();
const { check } = require('express-validator');

// Import route's controllers
const { authLogin, authUserLogged } = require('../controllers/auth');


// Import Middlewares
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validateJWT');




/*
    [AUTH] Login Service
*/
router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mayor que 5 caractéres').isLength({min: 6}),
        fieldValidator
    ], 
    authLogin
)

router.get(
    '/',
    [
       validateJWT 
    ], 
    authUserLogged
)


module.exports = router;