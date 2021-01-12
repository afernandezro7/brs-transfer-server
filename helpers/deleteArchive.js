const fs = require('fs');
const path = require('path');

const deletePicture= (filename)=>{
    let pathImg = path.resolve(__dirname, `../uploads/${filename}`)
    
    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);
    }
}

module.exports= {
    deletePicture
}