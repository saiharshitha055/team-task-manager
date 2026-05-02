const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// @route   POST api/tasks
// @desc    Create a task (Protected Route)
router.post('/', auth, async (req, res) => {
  try {
    // FIX: Added 'status' to the destructuring here
    const { title, description, status } = req.body;

    const newTask = new Task({
      title,
      description,
      status: status || 'PENDING', // Uses the status from Postman, or defaults to PENDING
      createdBy: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;