// src/hooks/useUnsplashImages.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useUnsplashImages = (query, count = 1) => {
  const [images, setImages] = useState([]);
  const accessKey = 'W061DFLoUU_44-QW6N93eUyKiX9fv8iMaxO-vbtLqCs'; // 🛠️ replace with your Unsplash Access Key

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: { query, per_page: count },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        setImages(response.data.results);
      } catch (error) {
        console.error('Error fetching Unsplash images:', error);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query, count]);

  return images;
};

export default useUnsplashImages;
