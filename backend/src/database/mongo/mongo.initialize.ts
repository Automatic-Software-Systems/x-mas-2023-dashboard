import { MongoClient } from 'mongodb';
import { environment } from '../../../environments/environment';
import { prodEnvironment } from '../../../environments/environment-prod';

const mongoClient = new MongoClient(process.env.ENV == 'prod' ? prodEnvironment.database.mongo_uri : environment.database.mongo_uri, {});

let _db;

const initMongoDatabase = () => {
  if (_db) {
    //connection already exists
    throw new Error('Database Connection Already Exists');
  }
  return mongoClient
    .connect()
    .then((client) => {
      _db = client.db(process.env.ENV == 'prod' ? prodEnvironment.database.name : environment.database.name);
      return _db;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export { initMongoDatabase };
