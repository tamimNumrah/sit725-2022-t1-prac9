const express = require('express');
var cors = require('cors');
const app = express();


//Database connection


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.t53lw.mongodb.net/sit725_2022?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

// app.get('/', function (req, res) {
//   res.send('Hello World');
// })

const addNumbers = (number1, number2) => {
    var num1 = parseInt(number1);
    var num2 = parseInt(number2);
    return num1 + num2;
};

app.get("/addTwoNumbers", (req, res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addNumbers(number1, number2);
    res.json({
        statusCode: 200,
        data: result,
        message: "Success"
    });
});

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App running at http://localhost: " + port);
});