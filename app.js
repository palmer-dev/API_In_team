// SERVER WEB
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

// ROUTES
const users_routes = require('./routes/users');
const auth_routes = require('./routes/auth');
const register_routes = require('./routes/register');
const roles_routes = require('./routes/roles');
const spareparts_routes = require("./routes/spareparts");
const categories_routes = require("./routes/categories");
const maintenance_routes = require("./routes/maintenances");
const gmaoproducts_routes = require("./routes/gmaoproducts");

// CERTIFICATE
const privateKey = fs.readFileSync('./certs/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');
const ca = fs.readFileSync('./certs/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// SECURITY
const verifyToken = require('./middlewares/authJWT');

// MONGO DB
const mongoose = require('mongoose');
const checkRoleAdmin = require('./middlewares/checkRole.js');

// VARIABLE ENV
require('dotenv').config();

// CONNECT TO MONGO DB WITH MONGOOSE
mongoose.connect(process.env.MONGO_URI, { authSource: "admin", "user": process.env.MONGO_USERNAME, "pass": process.env.MONGO_PASS })
    .then((result) => {
        // IF THE CONNECTION IS ESTABLISHED, START HTTPS SERVER
        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(process.env.PORT, () => {
            console.log(`HTTPS Server running on port ${process.env.PORT}`);
            console.log(`
                Addresses :
                    https://localhost:${process.env.PORT}
                    https://lab-rey.fr:444
            `);
        });
    })
    .catch((err) => console.log(err));

mongoose.set('debug', true)
// GLOBAL PARAMETER FOR THE APP
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined'));

// ALL ROUTES PARAMETER
app.use('/auth', auth_routes);
app.use('/register', verifyToken, checkRoleAdmin, register_routes);

// API ROUTES
// app.use('/api', verifyToken);

// PRIVATE ROUTES
app.use('/api/users', checkRoleAdmin, users_routes);

// PUBLIC ROUTES
app.use('/api/roles', roles_routes);
app.use('/api/category', categories_routes);
app.use('/api/spareparts', spareparts_routes);
app.use('/api/maintenance', maintenance_routes);
app.use('/api/gmaoproducts', gmaoproducts_routes);

app.get('/', (req, res) => { res.send([{ title: "API SERVEUR LAB-REY", message: "Vous êtes à la racine de l'API, ici il ne se passe rien, c'est triste :(" }]) })