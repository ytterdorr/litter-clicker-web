var axios = require('axios');
var data = JSON.stringify({
    "collection": "trashSession",
    "database": "testDB",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1,
        "name": 1,
        "_partition": 1
    }
});

var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-trduh/endpoint/data/beta/action/find',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.REACT_APP_MONGODB_DATA_API_KEY // Make sure this is only used in backend
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });


// const { MongoClient } = require("mongodb");
// "mongodb + srv://ytterdorr:MongoPass147@cluster0.xhnr0.mongodb.net/testDB?retryWrites=true&w=majority"

// Replace the following with your Atlas connection string
// const url = "mongodb+srv://ytterdorr:MongoPass147@cluster0.xhnr0.mongodb.net/testDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);