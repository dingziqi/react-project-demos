const Koa = require('koa');
const debug = require('debug');
const config = require('config');
const serve = require('koa-static');
const koaWebpack = require('koa-webpack');

const boot = debug('app:boot');
const app = new Koa();

debug.enable('app:*');
app.use(serve('./dist'));

new Promise((resolve, reject) => {
  if (!process.env.isLocalDev) {
    return resolve();
  }

  const webpConf = require('../webpack/webpack.dev');
  const opts = {
    config: webpConf,
    devMiddleware: {
      stats: webpConf.stats
    },
    hotClient: {
      allEntries: true
    }
  };

  koaWebpack(opts).then(middleware => {
    app.use(middleware);
    resolve();
  });
}).then(() => {
  // load middleware or do other thing here
});

app.listen(config.port, () => {
  boot(`server start on ${config.port}`);
});
