const express = require("express");
const app = express();
const fs = require('fs');
const morgan = require("morgan");
const cors = require('cors');
app.use(cors());

function router(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('dev'))

    const routes = "./modules";
    fs.readdirSync(routes).forEach((file) => {
        fs.readdirSync(`${routes}/${file}/routes`).forEach((routesfile) => {
            if (routesfile !== "undefined" && routesfile.match(/routes.js/))
            require(`./modules/${file}/routes/${routesfile}`)(app);
        });
    });

    app.use(`/${process.env.ENDPOINT}/${process.env.VERSION}/`, (req, res) => {
        res.send("Hello, capture img");
    });
}

router(app);

module.exports = app;