import { Db, MongoClient } from 'mongodb';
import { environment } from '../../../environments/environment';
import { prodEnvironment } from '../../../environments/environment-prod';

let databaseConnection: MongoClient = null;

export async function TestConnectLocalDb(): Promise<Db> {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'opening connection to local db');
    const db_uri = process.env.ENV == 'prod' ? prodEnvironment.database.mongo_uri : environment.database.mongo_uri;
    const mongoClient = new MongoClient(db_uri, {});
    databaseConnection = await mongoClient.connect();
    return databaseConnection.db(process.env.ENV == 'prod' ? prodEnvironment.database.name : environment.database.name);
  } catch (e) {
    console.log('Failed to connect to local db');
  }
}

export async function TestCloseLocalDb(): Promise<void> {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'closing connection to local db');
    await databaseConnection.close();
  } catch (e) {
    console.log('FAILURE TO CLOSE DB CONNECTION');
  }
}
