const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const router = express.Router();

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// importing database
require('./models/index');

// PORT 
const  {PORT}= require('./config/env/env');

// using middlewares
app.use(express.json());
app.use(express.urlencoded());

//  distrubting routes in routes - index.js
app.use('/', require('./routes'));

const server = app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});