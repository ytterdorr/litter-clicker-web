const express = require('express');
const path = require('path');
var axios = require('axios');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/


app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/express_backend', (req, res) => {
    res.send({ express: 'LALA, YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })

});

app.get('/get_all_summaries', (req, res) => {

})

app.get('/get_mongo_data', (req, res) => {

    var data = JSON.stringify({
        "collection": "trashSession",
        "database": "testDB",
        "dataSource": "Cluster0",
        "projection": {
            "_id": 1,
            "itemSum": 1,
            "itemCount": 1,
            "items": 1,
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
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    // res.send({ data_key: process.env.REACT_APP_MONGODB_DATA_API_KEY })
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    // res.sendFile(path.join(__dirname, 'client/public', 'index.html'))
})


app.listen(port, () => console.log(`Listening on port ${port}`));