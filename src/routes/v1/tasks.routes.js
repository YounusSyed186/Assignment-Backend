const express = require('express');
const router = express.Router();
const tasks = require('../../controllers/tasks.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const Joi = require('joi');
const validate = require('../../middlewares/validate.middleware');

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('todo','in-progress','done').optional()
});

router.use(authenticate);
router.post('/', validate(taskSchema), tasks.createTask);
router.get('/', tasks.getTasks);
router.get('/:id', tasks.getTask);
router.put('/:id', validate(taskSchema), tasks.updateTask);
router.delete('/:id', tasks.deleteTask);

module.exports = router;
