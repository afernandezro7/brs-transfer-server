/****************************************
*          [UPLOADS] ROUTES             *
*         host + /api/uploads           *
*---------------------------------------*  
*    UPLOAD ARCHIVE: post  '/'          *
*                                       *
*****************************************/

const express = require('express');
const router  = express.Router();


// Import route's controllers
const { uploadArchive, downloadArchive, deleteArchive } = require('../controllers/uploads');

// Import Middlewares
const { validateJWT } = require('../middlewares/validateJWT');



/*
    [UPLOADS] Upload archive Service
*/
router.post(
    '/',
    [
        validateJWT
    ], 
    uploadArchive
)

router.get(
    '/:archive',    
    downloadArchive,
    deleteArchive
)




module.exports = router;