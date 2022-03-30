const express = require('express');
var cors = require("cors")
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
let projectCollection;

//Database connection


const uri = "mongodb+srv://admin:admin@cluster0.t53lw.mongodb.net/sit725_2022?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const createColllection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}


app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

// app.get('/', function (req, res) {
//   res.send('Hello World');
// })

//Database project getter setter
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

//GET API for projects
app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

//POST API to insert projects
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
        }
    })
})

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
    createColllection("pets")
});