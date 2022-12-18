const express = require('express');
const methodOverride = require('method-override');
// const cors = require('cors')

const configViewEngine = require('./config/viewEngine');
const routes = require('./routes');
const connectDB = require('./config/connectDB');
require('dotenv').config();


const app = express();
// app.use(cors({ origin: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



const port = process.env.PORT || 8080;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(methodOverride('_method'));

configViewEngine(app);
routes(app);

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})