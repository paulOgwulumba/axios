/* eslint-disable linebreak-style */
const express = require('express');
const products = require('../db/connection');
const Client = require('../db/connection-mongo');
const schemaEnforcer = require('../middleware/schemaEnforcer');
const imageParser = require('../middleware/imageParser');
const getImageBytes = require('../utils/getImageBytes');

const router = express.Router();
products.connect((err) => {
  if (err) {
    console.log('Unable to connect to database server.');
  } else {
    console.log('Connected to database successfully!');
  }
});

let imageDB;

Client.connect((err) => {
  if (err) {
    console.log('Failed to connect to image database');
  } else {
    imageDB = Client.db().collection('image_base');
    console.log('Connected to image base successfully');
  }
});

/**
 * Get all products from database.
 */
router.get('/', async (req, res) => {
  console.log('Attempting to get all products from database');
  products.query('SELECT * FROM products', async (error, data) => {
    if (error) {
      console.log(error);
      res.status(503).send({ message: 'Database error' });
    } else {
      const parsedData = await getImageBytes(data, imageDB);
      res.send({ data: parsedData, status: 'success' });
    }
  });
});

/*
 * Get product whose key is specified in the request url from the database
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  products.query(`SELECT * FROM products WHERE product_key = ${id}`, async (error, data) => {
    if (error) {
      res.status(403).send({ message: 'No information found' });
    } else {
      const parsedData = await getImageBytes(data, imageDB);
      res.send({ data: parsedData, status: 'success' });
    }
  });
});

/**
 * Add new product to database
 */
router.post('/', schemaEnforcer, imageParser, async (req, res) => {
  const {
    productName,
    productDescription,
    productVarieties,
    dateUploaded,
    dateEdited,
  } = req.body;

  const productVarietiesStringified = JSON.stringify(productVarieties);

  // console.log(productVarietiesStringified);

  products.query(`
    INSERT INTO products (product_name, product_description, product_varieties, date_uploaded, date_edited)
    VALUES ('${productName}', '${productDescription}', '${productVarietiesStringified}', '${dateUploaded}', '${dateEdited}')
  `, (error, data) => {
    if (error) {
      res.send({ status: 'failed', error });
    } else {
      res.send({ status: 'success', data });
    }
  });
});

/**
 * Update an existing product
 */
router.put('/', schemaEnforcer, imageParser, async (req, res) => {
  const {
    productName,
    productDescription,
    productVarieties,
    dateEdited,
    productKey,
  } = req.body;

  const productVarietiesStringified = JSON.stringify(productVarieties);

  products.query(`
    UPDATE products 
      SET 
        product_name = '${productName}',
        product_description = '${productDescription}',
        product_varieties = '${productVarietiesStringified}',
        date_edited = '${dateEdited}'
      WHERE
        product_key = ${productKey};
    `, (err, data) => {
    if (err) {
      res.status(503).send({ status: 'failed', error: err });
    } else {
      res.status(200).send({ status: 'success', data });
    }
  });
});

/**
 * Delete a product from the database
 */
router.delete('/:productKey', (req, res) => {
  const { productKey } = req.params;

  products.query(`
    DELETE FROM products WHERE product_key = '${productKey}'
  `, (error, data) => {
    if (error) {
      res.status(503).send({ status: 'failed', error });
    } else {
      res.status(200).send({ status: 'success', data });
    }
  });
});

module.exports = router;
