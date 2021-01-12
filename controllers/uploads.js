/*************************************
*        [UPLOADS] CONTROLLERS       *
*------------------------------------*
*           Upload Archive           *
**************************************/

const { response } = require('express');// se declara express para recuperar el tipado es OPCIONAL
const multer  = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Link = require('../models/Link');

/*
    [UPLOADS] upload Archive Controller
*/
const uploadArchive = async( req, res = response)=>{

    const multerConfig = {
        limits: { fileSize: req.tokenInfo ? 1024*1024*1024 : 1024*1024},
        storage: multer.diskStorage({
            destination: (req, file, cb) =>{
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) =>{
                const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
                cb(null, `${shortid.apply()}.${extension}`)
            },
    
        })
    
    }

    const upload = multer(multerConfig).single('archive')


    upload(req, res, async (error)=>{

        if(!error){

            res.status(200).json({
                ok: true,
                msg:'Archivo subido correctamente',
                archive: req.file.filename
            })

        }else{
            console.log(error);
            res.status(200).json({
                ok: false,
                msg:'No se pudo subir el archivo'
            })
        }
    
    })

}

/*
    [UPLOADS] delete Archive Controller
*/
const deleteArchive = async( req, res = response)=>{

    console.log(req.archive)

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archive}`)
        console.log('Archivo eliminado');
    } catch (error) {
        console.log(error);
    }

}

/*
    [UPLOADS] download Archive Controller
*/
const downloadArchive = async( req, res = response, next)=>{

    const filePath = __dirname + `/../uploads/${req.params.archive}`
    const filePathError = __dirname + `/../uploads/error.jpg`
    
   
    if (!fs.existsSync(filePath)){
        return res.download(filePathError)
    }

    res.download(filePath)

    const link = await Link.findOne({name: req.params.archive})
    const { downloads, name } = link;


    // if downloads is equal to 1 -> Delete archive
    if(downloads===1){
        // delete archive from harddrive
        req.archive = name;  
        
        //  delete link database registry
        await Link.findOneAndRemove(link.id)
        next()

    } else if(downloads > 1){
        // if downloads is mayor to 1 -> -1 to downloads number
        link.downloads--;
        await link.save();
    }
    
}

module.exports = {
    uploadArchive,
    deleteArchive,
    downloadArchive
}