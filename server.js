// server.js
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Proxy middleware
  server.use(
    '/api', // Eğer sadece belirli bir yolu proxy etmek istiyorsanız, burayı güncelleyebilirsiniz
    createProxyMiddleware({
      target: 'https://celal.alwaysdata.net', // Hedef URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Eğer hedefte belirli bir alt yolu kullanıyorsanız, burayı güncelleyebilirsiniz
      },
    })
  );

  // Diğer istekleri Next.js'e yönlendirme
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Sunucuyu dinleme
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
