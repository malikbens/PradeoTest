const express = require('express');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: /http:\/\/locahost/
}));
app.options('*', cors());

app.listen(port, () => {
    console.log('Server is up !')
})