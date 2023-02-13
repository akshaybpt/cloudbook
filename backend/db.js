const mongooes = require('mongoose');
require('dotenv').config()
const mongURI = process.env.DATABASEURL;
    const connectToMongo = async() => { //with callback function can alse=o be used with async and await

        try {
            await mongooes.connect(mongURI);
            console.log("connected to database");
          } catch (error) {
            console.log(error);
          }
        };
    module.exports = connectToMongo;
    


