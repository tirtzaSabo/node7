const express = require('express');
const bodyParser = require(
    'body-parser'
)
const worker = require('./controller/workers.js');
const curse = require('./controller/curses.js');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:
        false
}))
app.use(worker);
app.use(curse);

app.get("*", (req, res) => {
    res.status(404);
    res.send("PAGE NOT FOUND");
});

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.send("THERE IS AN ERROR IN THE SERVER NOW,TRY LATER")
}
app.use(errorHandler)
app.listen(3000, () => {

})
// const express = require(
//     'express'
// )
// const bodyParser = require(
//     'body-parser'
// )
// const app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended:
//         false
// }))
// app.get(
//     '/'
//     , (req, res) => {
//         res.send(
//             'Hello World!'
//         )
//     })
// app.post(
//     '/'
//     , (req, res) => {
//         let
//             data = req.body;
//         res.send(
//             'Data Received: '
//             + JSON.stringify(data));
//     })
// app.listen(3000, () => {
//     console.log(
//         'Example app listening on port 3000!'
//     )
// })