// const bodyParser = require('body-parser')
const app = require('express')();
// const helmet = require('helmet');
const request = require('request');
// const helmetConfig = require('../modules/helmet.js');
// app.disable("x-powered-by");
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(helmet(helmetConfig))
// const options = {};
// if (process.env.CMS_API_BASIC_AUTH_ENABLED) {
//     options.auth = {
//         user: process.env.CMS_API_BASIC_AUTH_USERNAME,
//         pass: process.env.CMS_API_BASIC_AUTH_PASSWORD,
//     }
// }
app.get('/shows/', (req, res) => {
    // eslint-disable-next-line
    console.log(req);
    req.pipe(
        request.get('https://ticket-api.bolshoi.ru/v1/shows/', {
            rejectUnauthorized: false,
            headers: {
                'X-API-token': process.env.X_API_TOKEN
            }
        })
    ).pipe(res);
});
module.exports = app;
