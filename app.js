const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
// const bodyParser =require('b')

app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const sendOtpRoutes = require('./routes/sendOtp');
const verifyOtpRoute = require('./routes/verifyOtp');


const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/verifyOtp`, verifyOtpRoute);
app.use(`${api}/sendOtp`, sendOtpRoutes);

//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eshop-database',
    })
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

//Server
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
});
