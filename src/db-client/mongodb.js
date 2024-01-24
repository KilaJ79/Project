import { MongoClient, ServerApiVersion } from "mongodb";

let cacheMongoDBClient;

/**
 * get mongodb client instance
 * @returns
 */
async function getInstance() {
  console.log("MongoClient getInstance called");
  
  if (cacheMongoDBClient) {
    console.log(`MongoClient use cacheMongoDBClient`);
    return cacheMongoDBClient;
  }

  const url = process.env.DM_USERS_DB_URL
  console.log({
    url
  })
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  // const client = new MongoClient(url, {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // });

  await client.connect();
  cacheMongoDBClient = client;

  return client;
}

export default cacheMongoDBClient;
export {
  getInstance
}