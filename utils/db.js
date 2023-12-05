import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Class for Mongo service operations
 */

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DB_DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Checks if connection to MongoDB is successful
   * @return {boolean} true if connection is alive or false if not
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * Returns the number of documents in the collection users
   * @return {number} amount of users
   */
  async nbUsers() {
    try {
      const users = this.db.collection('users');
      const numberOfUsers = await users.countDocuments();
      return numberOfUsers;
    } catch (error) {
      console.error('Error counting users:', error.message);
      throw error;
    }
  }

  /**
   * Returns the number of documents in the collection(files)
   * @return {number} amount of files
   */
  async nbFiles() {
    try {
      const files = this.db.collection('files');
      const numberOfFiles = await files.countDocuments();
      return numberOfFiles;
    } catch (error) {
      console.error('Error counting files:', error.message);
      throw error;
    }
  }
}
const dbClient = new DBClient();

export default dbClient;
