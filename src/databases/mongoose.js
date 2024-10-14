const {Schema: BaseSchema, model} = require('mongoose');
const {nextId} = require('../helpers/idGenerator');
const util = require('util');
const createError = require('http-errors');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 15,
};

function Schema() {
  BaseSchema.apply(this, arguments);

  this.add({
    _id: {
      type: String,
      default: () => nextId(),
    },
  });

  this.statics.findByIdOrFail = async function (id, errorMessage = null) {
    const entity = await this.findById(id);

    if (!entity) {
      throw createError.NotFound(errorMessage ?? `Entity not found #${id}`);
    }

    return entity;
  };

  this.statics.findOneOrFail = async function (filter, errorMessage = null) {
    const entity = await this.findOne(filter);

    if (!entity) {
      throw createError.NotFound(errorMessage ?? `Entity not found #${filter}`);
    }

    return entity;
  };

  this.plugin(mongoosePaginate);
}

util.inherits(Schema, BaseSchema);

module.exports = {
  Schema,
  model,
};
