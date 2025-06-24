const Joi = require("joi");

const { State } = require("../constants/states");

const nodeSchema = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(2).max(255).required(),
  location: Joi.string().min(2).max(255),
  projectId: Joi.number().integer().positive(),
  status: Joi.string()
    .valid(State.ACTIVE, State.INACTIVE, State.MAINTENANCE, State.ERROR)
    .default(State.ACTIVE),
});

module.exports = { nodeSchema };
