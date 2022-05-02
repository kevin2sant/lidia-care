const serverless  = require("serverless-http");
const express     = require("express");
const morgan      = require('morgan')
const cors        = require('cors')
const path        = require('path')
const bodyParser  = require('body-parser')

const app       = express();
const user      =  require('./routes/userRoute')
const company   =  require('./routes/companyRoute')
const plans     = require('./routes/plansRoute')
const psy       = require('./routes/psyRoute')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// url
app.use('/care/user', user)
app.use('/care/company', company)
app.use('/care/plans', plans)
app.use('/care/psy', psy)



app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
