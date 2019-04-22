const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const helmet = require('helmet');
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helmet Security
app.use(helmet({
    frameguard: {
        action: 'deny'
    },
    contentSecurityPolicy: {
        directives: {
            "imgSrc": ["'self'",'hyperdev.com']
        }
    },
    dnsPrefetchControl: false
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

routes(app);

// 404 Not found middleware
app.use((req, res, next) => {
    res.status(404)
        .type('text')
        .send('Not Found');
});

app.listen(config.PORT || 8001, () => {
    console.log("App running on port " + config.PORT);
});
