/* eslint-disable linebreak-style */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const { MongoClient } = require('mongodb');

const Client = new MongoClient(mongodbUri, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

module.exports = Client;
