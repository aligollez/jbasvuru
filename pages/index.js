import Head from 'next/head';
v
import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    // Sayfa yüklendiğinde ve her 2 saniyede bir post isteği gönder
    const intervalId = setInterval(() => {
      sendPostRequest();
    }, 2000);

    // Sayfa kapatıldığında interval'i temizle
    return () => clearInterval(intervalId);
  }, []);

  const sendPostRequest = async () => {
    try {
      // Tarayıcı URL'sini post etmek için axios kullanımı
      await axios.post('/api', { url: window.location.href });
    } catch (error) {
      console.error('POST isteği hatası:', error);
    }
  };

  return (
    <div>
      {/* Diğer içerikler buraya eklenebilir */}
    </div>
  );
};

export default Home;

 
