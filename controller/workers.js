const { Router } = require('express');
const app = Router();
const fs = require('fs').promises;
let workers;
let getWorkers = async function () {
    workers = await fs.readFile('./data/workers.json');
    workers = await JSON.parse(workers)
    app.get('/workers/:workerId', (req, res) => {
        const id = Number(req.params.workerId)
        const worker = workers.find(worker => worker.id === id)
        if (!worker) {
            res.status(404);
            res.send("WORKER NOT FOUND");
        }
        res.json(worker);
    });
    app.get('/workers', (req, res) => {
        let workers1 = workers;
        const job = req.query.job;
        const department = req.query.department;
        const dateOfBegin = req.query.dateOfBegin;
        if (job != null) {
            workers1 = workers1.filter(worker => worker.job.toLowerCase().includes(job.toLowerCase()))
        }
        if (department != null) {
            workers1 = workers1.filter(worker => worker.department.toLowerCase().includes(department.toLowerCase()))
        }
        if (dateOfBegin != null) {
            workers1 = workers1.filter(worker => new Date(worker.dateOfBegin) >= new Date(dateOfBegin))
        }
        res.json(workers1);
    });
}


getWorkers();
module.exports = app;