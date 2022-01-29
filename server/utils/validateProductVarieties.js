/* eslint-disable linebreak-style */
module.exports = (productVarieties) => {
  let status = true;
  try {
    productVarieties.forEach((variety) => {
      const keys = Object.keys(variety);
      if (
        keys.indexOf('size') === -1
        || keys.indexOf('color') === -1
        || keys.indexOf('quantity') === -1
        || keys.indexOf('images') === -1
        || keys.indexOf('price') === -1
      ) {
        status = false;
      }
    });
  } catch (e) {
    status = false;
  }

  return status;
};
