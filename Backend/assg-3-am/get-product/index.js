const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url = process.env.CONNECTION_STRING;

const client = new MongoClient(url);

module.exports = async function (context, req) {
 
  await client.connect();
  const database = client.db("Warehouse")
  const collection = database.collection("Product")

  let person = await collection.findOne({ ShippingPO : req.params.id })
  
  context.log(process.env.vault_api_key)
  
  if (!person){
      return context.res = {
          status:400,
          body: "Couldnt find that product"
      }
  }
 
   return (context.res = {
        // status: 200, /* Defaults to 200 */
        body: person
    });
};