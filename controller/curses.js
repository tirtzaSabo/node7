const { Router } = require('express');
const app = Router();
const fs = require('fs').promises;
let curses;
let getCurses = async function () {
    curses = await fs.readFile('./data/curses.json');
    curses = await JSON.parse(curses)
    app.get('/curses/:curseId', (req, res) => {
        const id = Number(req.params.curseId)
        const curse = curses.find(curse => Number(curse.id) === id)
        if (!curse) {
            res.status(404);
            res.send("CURSE NOT FOUND");
        }
        res.json(curse);
    });
    app.get('/curses', (req, res) => {
        res.json(curses);
    });
    app.put('/id', (req, res) => {
        let id = req.params;
        for (i = 0; i < curses; i++) {
            if (curses[i].id == id)
                curses[i] = req.body;

        }
        res.send()
    }


    )
}
app.post('/', (req, res) => {
    let data = JSON.stringify(req.body);
    console.log(data);
    fs.writeFile("curses.json", data,
        {
            encoding:
                "utf8"
            ,

            flag:
                "a"
            ,
            mode: 0o666
        })
    res.send('Data Received: ' + JSON.stringify(data));
})
app.delete('/', (req, res) => {
    let data = JSON.stringify(req.body);
})
getCurses();
module.exports = app;