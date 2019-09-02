const path = require('path');
const Koa = require('koa');
const koaCompress = require('koa-compress');
const compressible = require('compressible');
const koaStatic = require('./koa/static');
const conf = require('./app');
const SSR = require('./ssr');

const isProd = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(
  koaCompress({
    filter: type => !(/event\-stream/i.test(type) && compressible(type)),
  }),
);

app.use(
  koaStatic(
    isProd
      ? path.resolve(__dirname, '../dist/web')
      : path.resolve(__dirname, '../public'),
    {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  ),
);

SSR(app).then(server => {
  server.listen(conf.app.port, '0.0.0.0', () => {
    console.log(`server is starting ...`);
  });
});
