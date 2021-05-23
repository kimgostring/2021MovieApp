const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Node의 서버번호를 여기 넣어주면 됨
      changeOrigin: true,
    })
  );
};