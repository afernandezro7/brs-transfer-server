/****************************************
*          [USERS] ROUTES               *
*         host + /api/users             *
*---------------------------------------*  
*    CREATE USER: post    '/create'     *
*                                       *
*****************************************/

const express = require('express');
const { check } = require('express-validator');
const router  = express.Router()

// Import route's controllers
const { createUser } = require('../controllers/users');

// Import Middlewares
const { fieldValidator } = require('../middlewares/field-validator');



/*
    [USER] Create USER Service
*/
router.post(
    '/create',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mayor que 5 caractéres').isLength({min: 6}),
        fieldValidator
    ], 
    createUser
)


module.exports = router;