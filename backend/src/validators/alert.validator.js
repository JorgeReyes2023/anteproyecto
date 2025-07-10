const Joi = require("joi");

const alertSchemaId = Joi.object({
  id: Joi.number().integer().positive(),
});

const alertSchema = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string().min(2).max(255).required(),
  type: Joi.string().valid("warning", "critical").required(),
  is_read: Joi.boolean().default(false),
  sensor_id: Joi.number().integer().positive().allow(null),
});

module.exports = { alertSchema, alertSchemaId };
