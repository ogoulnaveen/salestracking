const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

 const database = "mongodb://52.77.240.221:27017/salesdb"; 

/* const database = "mongodb://localhost:27017/salesdb"; */



mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});
mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:" + err);
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use(express.static(path.join(__dirname, '/dist/ng-mash-able')));
//routes
const allRoutes = require('./routes/allRoutes');
app.use('/api', allRoutes);

app.get("/", (req, res) => {
    res.send("Invalid Endpoint.");
});

app.use('/images', express.static(process.cwd() + '/images'));

app.listen(port, () => {
    console.log("Server started on port:" + port);
});
