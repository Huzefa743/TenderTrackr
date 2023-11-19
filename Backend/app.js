const express= require("express");
const routes = require("./routes/routes")
const app =express();
const dotenv= require("dotenv");
dotenv.config();
const mongoose= require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(
  cors({
  //  allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
  //  exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
  })
);

app.use(express.static(path.join(__dirname,'build')));



//allows Cross-Origin resource sharing
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Methods", "PUT,POST, GET, DELETE, OPTIONS");
//     next();
// });



//local db connection
// const uri=process.env.LOCALMONGODB;
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err, client) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(`MongoDB Connected: `);
// });


//cloud db connection
const uri=process.env.MONGO_URI;
mongoose.connect(uri,{ useNewUrlParser: true }, { useUnifiedTopology: true }, {useCreateIndex : true})
.then(() => console.log("DB connected"));

mongoose.connection.on("error",err => {
    console.log("DB connection error: ",err.message);
})

mongoose.connection.on("error",err => {
    console.log("DB connection error: ",err.message);
})

//app.use(bodyParser.urlencoded({​​​​​ extended: false }​​​​​));
app.use(bodyParser.json());





//middleware to access routes.
app.use("/api/v1", routes);

app.use('/*', function(req,res) {
  
  res.sendFile(path.join(__dirname, 'build',  'index.html'));
});

const port= process.env.PORT || 8080;
console.log("Server started on this port: "+port)
app.listen(port);