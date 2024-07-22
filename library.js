const { MongoClient, ObjectId } = require("mongodb");

class Library {
  constructor(dbUrl, dbName, collName) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.collName = collName;
    this.dbClient; // Initialize as null
  }
  // method to connect to MongoDB server
  async client() {
    console.log(`Connecting to ${this.dbUrl}...`);
    this.dbClient = new MongoClient(this.dbUrl, {});
    await this.dbClient.connect();
    console.log("Connected to database");
    return this.dbClient;
  }
  // method to test connection
  async test() {
    const client = await this.client();
    // You can add any test operations here
    client.close();
    console.log("Connection closed");
  }
  // method to get collection
  async collection() {
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection(this.collName);
    return collection;
  }
  // method to retrieve all books
  async allBooks() {
    const collection = await this.collection();
    return collection.find({}).toArray();
  }

  //find one book by its id
  async findOneBook(id) {
    const docId = new ObjectId(id);
    const collection = await this.collection();
    return collection.findOne({ _id: docId });
  }
  //find multiple books
  async findManyBooks(query) {
    const collection = await this.collection();
    return collection.find(query).toArray();
  }
  //add a new book to collection
  async addBook(info) {
    const collection = await this.collection();
    const result = await collection.insertOne(info);
    console.log("Book is added sucessfully", result.insertId);
  }
  //update book its id with new information
  async changeBook(id, newInfo) {
    const mongoId = new ObjectId(id);
    const infoObj = { $set: newInfo };
    const collection = await this.collection();
    const result = await collection.updateOne({ _id: mongoId }, infoObj);
    console.log("Book is updated successfully", result.modifiedCount);
  }
  // remove book by its id
  async removeBook(id) {
    const mongoId = new ObjectId(id);
    const collection = await this.collection();
    const result = await collection.deleteOne({ _id: mongoId });
    console.log("Book is removed successfully", result.deletedCount);
  }
}

module.exports = Library;
