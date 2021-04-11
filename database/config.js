require('dotenv').config();

const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true, // Requisito nuevo de mongoose para conectar
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD. Ver logs');
    }

};

module.exports = {
    dbConnection
};
