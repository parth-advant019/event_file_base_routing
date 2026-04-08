import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("newsletter");

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, filter, sort) {
  const db = client.db("newsletter");

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
