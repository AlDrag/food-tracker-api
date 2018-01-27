const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Cors = require('@koa/cors');
const app = new Koa();

app.use(BodyParser());
// Limit CORS to safe URLs.
app.use(Cors());

const api = require('./routes');

app
    .use(api.routes())
    .use(api.allowedMethods());

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
console.log(`Starting server on port ${PORT} with env ${ENV}`);
const server = app.listen(PORT).on("error", err => {
    console.error(err);
});

module.exports = server;