module.exports = {
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      "/api": {
        target: "http://localhost:8080", //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/mock", //代理的路径
        },
      },
    },
  },
};
