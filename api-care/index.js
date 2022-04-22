const serverless  = require("serverless-http");
const express     = require("express");
const morgan      = require('morgan')
const cors        = require('cors')
const path        = require('path')
const bodyParser  = require('body-parser')

const app   = express();
const user  =  require('./routes/userRoute')
const company = require('./routes/companyRoute')
const plans = require('./routes/plansRoute')
const psy = require('./routes/psyRoute')

//app.use(notFoundMiddleware)
app.set('port', process.env.PORT || 3001);

//morgan -> permite ver por consola las peticiones que se hacen
app.use(morgan('dev'));

//cors -> proporciona middleware con cors para utilizar con varias opciones para permitir conexiones remotas
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// url
app.use('/care/user', user)
app.use('/care/company', company)
app.use('/care/plans', plans)
app.use('/care/psy', psy)


app.listen(app.get('port'), () => {
  console.log(`Servidor Conectado. ${app.get('port')}`);
})
