/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const { ObjectId } = require('mongodb');

module.exports = async (data, imagesDB) => {
  if (data) {
    for (const product of data) {
      try {
        const parsedProductVarieties = JSON.parse(product.product_varieties);
        for (const variety of parsedProductVarieties) {
          for (const image of variety.images) {
            const bytes = await imagesDB.findOne({ _id: ObjectId(image) });
            if (bytes) {
              parsedProductVarieties[parsedProductVarieties.indexOf(variety)]
                .images[variety.images.indexOf(image)] = bytes.bytes;
            }
          }
        }
        data[data.indexOf(product)].product_varieties = JSON.stringify(parsedProductVarieties);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return data;
};
