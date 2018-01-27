const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

const index = async ctx => {
  try {
    const food = await knex("food").select();
    ctx.body = {
      data: food
    };
  } catch (error) {
    console.error(error);
  }
};

const get = async ctx => {
  try {
    const food = await knex("food").select().where({id: ctx.params.id});
    if (!food.length) {
      throw new Error("The requested resource does not exist");
    }
    ctx.body = {
      data: food
    };
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = {
        error: error.message
    }
  }
};

module.exports = { index, get };