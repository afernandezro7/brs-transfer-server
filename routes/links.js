/****************************************
*          [LINKS] ROUTES               *
*         host + /api/links             *
*---------------------------------------*  
*    CREATE LINK: post    '/create'     *
*                                       *
*****************************************/

const express = require('express');
const { check } = require('express-validator');
const router  = express.Router();

// Import route's controllers
const { createLink, getLink , getAllLink} = require('../controllers/links');

// Import Middlewares
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validatePassword, hashPassword } = require('../middlewares/validatePassword');


/*
    [LINKS] Create Link Service
*/
router.post(
    '/create',
    [
        check('original_name', 'El nombre original del archivo es Obligatorio').not().isEmpty(),
        check('name', 'El nombre del archivo es Obligatorio').not().isEmpty(),
        fieldValidator,
        validateJWT,
    ], 
    createLink
)

/*
    [LINKS] Get All Link Service
*/
router.get(  '/', getAllLink )


/*
    [LINKS] Get Link Service
*/
router.get(
    '/:url',
    validatePassword, 
    getLink
)
/*
    [LINKS] Get Link Service
*/

router.post(
    '/:url',
    check('password', 'La contraseña es Obligatoria').not().isEmpty(),
    fieldValidator,
    hashPassword
)




module.exports = router;
