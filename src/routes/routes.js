const { Router } = require('express');
const router = Router();

const Task = require('../models/Task');

router.get('/', async (req, res) => {
    let tasks = await Task.find();
    res.render('index', {tasks});
});

router.post('/add', async (req, res) => {
    let task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    let { id } = req.params;
    let task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    let { id } = req. params;
    let task = await Task.findById(id);
    res.render('edit', {task});
});

router.post('/edit/:id', async (req, res) => {
    let { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
    let { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

module.exports = router;