"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var session = require('express-session');
var passport =require('passport');
const dbconfig=require('./config/database');
const api = require('./routes/api');
const dotenv = require("dotenv");
const cors = require('cors');
var app=express();
app.use(cors({
  origin:['http://localhost:4200', 'http://localhost:4200'],
  credentials:true,
}));
dotenv.config({ path: ".env" });
app.set("port",process.env.PORT || 3000 );

app.use(express.static(path.join(__dirname,"dist")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_HOST, function(err,database){
  if (err) {
    console.log(err);
  }
  else {
    console.log("connecté");
  }
});

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: false,
}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',api);
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,"dist/index.html"));
});
app.listen(app.get('port'),function(){
	console.log("Server running at http://localhost:" + app.get("port"));
}); 