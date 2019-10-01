//server.js

const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB');

const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

const productRoute = require('./routes/product.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true}). then(
	() => {console.log('Database is connected')},
	err => {console.log('Can not connect to the database' + err)}
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.use('/products', productRoute);

 
app.post('/products/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});

let port = process.env.PORT || 4000;

const server = app.listen(port, ()=> {
	console.log('listening on port ' + port);
});
