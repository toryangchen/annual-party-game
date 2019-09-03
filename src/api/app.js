import KoaBody from 'koa-body';
const env = process.env.NODE_ENV || 'development';

export default app => {
  app.proxy = true;
  const server = require('http').createServer(app.callback());

  app
    .use((ctx, next) => {
      // 跨域
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set(
        'Access-Control-Allow-Headers',
        'Authorization, DNT, User-Agent, Keep-Alive, Origin, X-Requested-With, Content-Type, Accept, x-clientid',
      );
      ctx.set(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS',
      );

      if (ctx.method === 'OPTIONS') {
        (ctx.status = 200), (ctx.body = '');
      }
      return next();
    })
    .use(
      KoaBody({
        multipart: true,
        parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
        formidable: {},
        jsonLimit: '10mb',
        formLimit: '10mb',
        textLimit: '10mb',
      }),
    )
    .use((ctx, next) => {
      if (/^\/api/.test(ctx.url)) {
        ctx.body = 'World';
      }
      next();
    });
  if (env === 'development') {
    app.use((ctx, next) => {
      const start = new Date();
      return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
      });
    });
  }
  return server;
};
