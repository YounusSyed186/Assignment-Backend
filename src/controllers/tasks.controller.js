const Task = require('../models/task.model');

const createTask = async (req, res, next) => {
  try {
    const data = { ...req.body, owner: req.user._id };
    const t = await Task.create(data);
    res.status(201).json(t);
  } catch (err) { next(err); }
};

const getTasks = async (req, res, next) => {
  try {
    // Admin sees all, user sees own
    const filter = req.user.role === 'admin' ? {} : { owner: req.user._id };
    const tasks = await Task.find(filter).populate('owner', 'name email');
    res.json(tasks);
  } catch (err) { next(err); }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && !task.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    res.json(task);
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && !task.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && !task.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await task.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
