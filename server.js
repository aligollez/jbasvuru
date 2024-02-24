// server.js

const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // POST isteğini işleyen endpoint
  server.post('/analytics', async (req, res) => {
    try {
      // PHP sunucuya POST isteği gönderme
      const phpResponse = await axios.post('https://jojobets935.com/tr/analytics.php');

      // PHP sunucudan gelen veriyi kullanarak bir JSON yanıtı oluşturma
      return res.json({ phpData: phpResponse.data });
    } catch (error) {
      console.error('PHP sunucu ile iletişim hatası:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Ziyaretçilerin her 2 saniyede bir POST isteği gönderdiği fonksiyon
  const sendAnalyticsData = async () => {
    try {
      // Ziyaretçinin POST işlemini gerçekleştir
      await axios.post('http://localhost:3000/analytics');

      // 2 saniyede bir bu fonksiyonu çağır
      setTimeout(sendAnalyticsData, 2000);
    } catch (error) {
      console.error('POST isteği hatası:', error);
    }
  };

  // İlk çalıştırmayı yap
  sendAnalyticsData();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
