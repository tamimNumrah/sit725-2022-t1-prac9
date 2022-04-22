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
    return num1 + num2 || null;
};

app.get("/addTwoNumbers/:firstNumber/:secondNumber", (req, res) => {
    var number1 = req.params.firstNumber;
    var number2 = req.params.secondNumber;
    var result = addNumbers(number1, number2);
    if (result == null) {
        res.json({
            statusCode: 400,
            result: result
        }).status(400);
    } else {
        res.json({
            statusCode: 200,
            result: result,
            message: "Success"
        }).status(200);
    }
});

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App running at http://localhost: " + port);
});