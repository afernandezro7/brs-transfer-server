const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

        await mongoose.connect(process.env.BD_URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex: true
        });

        console.log('Database Online');
        
    } catch (error) {
        console.log(error); 
        console.log('Database error connection');
        process.exit(1);
    }
}

module.exports = dbConnection