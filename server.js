const express = require('express');
var cors = require("cors")
const app = express();
let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoute");
let userRoute = require("./routes/userRoute");


app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

//APIS
app.use('/api/projects',projectRoutes);
app.use('/api/user',userRoute);


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