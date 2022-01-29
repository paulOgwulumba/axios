/* eslint-disable linebreak-style */
const validateProductVarieties = require('../utils/validateProductVarieties');

module.exports = (req, res, next) => {
  const {
    productName,
    productDescription,
    productVarieties,
  } = req.body;

  if (!productName || !productDescription || !productVarieties) {
    res.status(403).send({ status: 'failed', message: 'Product must have a name, description and varieties' });
  } else if (!validateProductVarieties(productVarieties)) {
    res.status(403).send({
      status: 'failed',
      message: 'Product varieties object must contain these fields: size, color, quantity, images and price',
    });
  } else {
    switch (req.method) {
      case 'POST': {
        req.body.dateUploaded = new Date();
        req.body.dateUpdated = '';
        break;
      }
      case 'PUT': {
        req.body.dateUpdated = new Date();
        break;
      }
      default:
    }

    next();
  }
};
