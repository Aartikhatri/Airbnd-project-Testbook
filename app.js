import dotenv from 'dotenv' ;
dotenv.config();
import express from 'express';
import path, { dirname } from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import flash from 'connect-flash';
import session from "express-session" ;
import mongoStore  from 'connect-mongo';
import bodyParser from 'body-parser'





import faviconIcon from 'serve-favicon' 
import DbConnection from "../airbnd project with nodejs/db/DbConnection.js"

import web_pages from './route/route.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = process.env.PORT || 3000;

// connect-mongo to seesion , session data sended to the database;
const storage = mongoStore.create({
  mongoUrl : process.env.DATABASE_URL ,
  dbName : process.env.DATABASE_NAME,
  collectionName : "registrationData",
  autoRemove : "native"
})


// setting a session
app.use(session({
  secret: "secretKeyForAirbnb",
  saveUninitialized: false,
  resave: true,
  store: storage
})) 

// calling flash msg 
app.use(flash());

// calling database
DbConnection();


// parsing data to readable form
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// static files
app.use(express.static(path.join(__dirname ,'/public')))


// setting favicon icon 
app.use(faviconIcon(path.join('public','images','favicon.ico')));


// seting template engine 
app.set('view engine' , 'ejs');

// setting routes
app.use('/' , web_pages );

// port listening
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
  });