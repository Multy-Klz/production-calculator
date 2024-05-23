const mongoose = require('mongoose');

require('dotenv').config();

//Import model
const { Item }  = require('./../models/models');

//load the data from loadInitialData.js
const data = require('./loadInitialData').itemsData;

//delete all the Item Collection records and save the mockup data
async function cleanAllItemsRecords() {
    Item.deleteMany({}).then((res) => {
        console.log(res);
        
        return Item.insertMany(data)
        .then((docs) => {
            console.log('Documentos inseridos com sucesso:', docs.length);
          })
          .catch((error) => {
            console.error('Erro ao inserir documentos:', error);
          });
        
    }).then(() => {
        mongoose.connection.close();

    })
    .catch(console.error);
}

const databaseUrl = require('./../config/database').mongoURI;

mongoose.connect(databaseUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    cleanAllItemsRecords();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });