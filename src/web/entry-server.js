import { createApp } from './app';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now();
    const { app, router, store } = createApp();
    const { url } = context;
    const { fullPath } = router.resolve(url).route;
    if (fullPath !== url) {
      return reject(new Error(fullPath));
    }

    router.push(url);

    // onReady 有效可以确保 SSR是 服务端和客户端输出一致
    router.onReady(() => {
      // 返回目标位置或是当前路由匹配的组件数组
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error('404'));
      }
      Promise.all(
        matchedComponents.map(
          // asyncData是在每个Component中写
          ({ asyncData }) =>
            asyncData &&
            asyncData({
              store,
              route: router.currentRoute,
            }),
        ),
      )
        .then(() => {
          isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
