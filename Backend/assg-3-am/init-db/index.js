﻿const { MongoClient } = require("mongodb")
const { v4:uuidv4 } = require("uuid")

const url = 'mongodb://cosmos-mongo-am:NsP6PoXWsEsb4Vb4kntdOslpqMxeeZFiZ2VDXXmBs588XwXbAkHBpppvU2LbXAOUhWAt04N5rABbACDbQIEGmA==@cosmos-mongo-am.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmos-mongo-am@'
const client = new MongoClient(url)



let product = [
    {
        "ShipperID": "10000234",
        "Recieved":[
            {
                "Date": "Mar 11, 2022",
                "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "3f7b2654-052d-4a4e-905f-87f22a3877a9",
                "ShipmentID": "3",
                "BoxesRcvd": "5"
            },
            {
                "Date": "Mar 10, 2022",
                "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "71b720e3-2847-45de-bbe7-8fa099d64632",
                "ShipmentID": "2",
                "BoxesRcvd": "2"
            },
            {
                "Date": "Mar 9, 2022",
                "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "81d06bd2-39e3-427c-9fb3-4e217b9a4d60",
                "ShipmentID": "1",
                "BoxesRcvd": "12"
            }
        ]
    },
    {
        "ShipperID": "10000235",
        "Recieved":[
            {
                "Date": "Mar 15, 2022",
                "WarehouseID": "a908cef4-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "3f7b2654-022d-4a4e-905f-87f22a3877a9",
                "ShipmentID": "6",
                "BoxesRcvd": "100"
            },
            {
                "Date": "Mar 18, 2022",
                "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "71b720e3-2847-45de-bbe7-8fa099d64632",
                "ShipmentID": "5",
                "BoxesRcvd": "120"
            },
            {
                "Date": "Mar 9, 2022",
                "WarehouseID": "a90acef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "81d00bd2-39e3-427c-9fb3-4e217b9a4d60",
                "ShipmentID": "4",
                "BoxesRcvd": "12"
            }
        ]
    },
    {
        "ShipperID": "10000236",
        "Recieved":[
            {
                "Date": "Mar 25, 2022",
                "WarehouseID": "a908cef7-4c67-40f3-88f7-08a03ba4104e",
                "ShippingPO": "3f7b2650-022d-4a4e-905f-87f22a3877a9",
                "ShipmentID": "9",
                "BoxesRcvd": "100"
            },
            {
                "Date": "Mar 5, 2022",
                "WarehouseID": "a908cef7-4c67-40f2-88f7-08a03ba4104e",
                "ShippingPO": "71b720e3-2847-45df-bbe7-8fa099d64632",
                "ShipmentID": "8",
                "BoxesRcvd": "120"
            },
            {
                "Date": "Mar 31, 2022",
                "WarehouseID": "a90acef7-4c67-40f3-88f7-08a03ba4114e",
                "ShippingPO": "81d00bd2-39e3-427c-9fb3-4e217b9a4f60",
                "ShipmentID": "7",
                "BoxesRcvd": "127"
            }
        ]
    }
]


module.exports = async function (context, req) {

    await client.connect();
    const database = client.db("Warehouse")
    const collection = database.collection("Product")
    await collection.deleteMany({})
    await collection.insertMany(product);
    
        context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Init is done"
    };
}