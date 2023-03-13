const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const url = process.env.CONNECTION_STRING
const client = new MongoClient(url);

module.exports = async function (context, req) {
 
  await client.connect();
  const database = client.db("Warehouse")
  const collection = database.collection("Product")


  let shipper = await collection.findOne({ShipperID: req.params.shipperid})

  context.log(shipper)

  if(shipper){
      let query = {ShipperID: req.params.shipperid}
      let update = await collection.updateOne(query, {$push: {"Recieved":{$each: req.body.Recieved}}})

      return (context.res = {
            body: 'data inserted'
        });
  }else{
      let create = await collection.insertOne(req.body)
        if (!create){
            return context.res = {
                status:400,
                body: "Couldnt create"
            }
        }
 
    return (context.res = {
            body: 'data inserted'
        });

  }
 
   return (context.res = {
        body: create.value
    });
};