

// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://apis.data.go.kr/B551011/KorService1/',
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/main', {
            target: 'https://korean.visitkorea.or.kr/',
            changeOrigin: true,
        })
    );
};
