const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const package = require('./package.json');


const port = process.env.PORT || 5000;
const apiRoot = '/api';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/locahost/
}));
app.options('*', cors());

// configure routes
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`${package.name} -v${package.version}`);
});

// register routes
app.use(apiRoot, router);

app.listen(port, () => {
    console.log('Server is up !')
});