/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
const Client = require('../db/connection-mongo');

let imageDB;

Client.connect((err) => {
  if (err) {
    console.log('Failed to connect to image database');
  } else {
    imageDB = Client.db().collection('image_base');
    console.log('Connected to image base successfully');
  }
});

module.exports = async (req, res, next) => {
  const { productVarieties } = req.body;

  for (const variety of productVarieties) {
    for (const image of variety.images) {
      const result = await imageDB.insertOne({ bytes: image });
      productVarieties[productVarieties.indexOf(variety)]
        .images[variety.images.indexOf(image)] = result.insertedId;
    }
  }
  next();
};
