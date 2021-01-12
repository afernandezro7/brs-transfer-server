const jwt = require('jsonwebtoken');

const generateJWT = ( id, name, email )=>{

    return new Promise ( (resolve, reject) =>{

        const payload = { id, name, email}

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {expiresIn: '48h'} , (err, token)=>{

            if(err){
                reject('No se pudo generar token')
            }
           
            resolve( token )
        })
    })

}


module.exports = {
    generateJWT
}