
import React, { useState } from 'react';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const getImages = async () => {
    const n = 4;
    const size = '1024x1024';

    try {
      // const response = await fetch('http://localhost:3001/api/generate-images', {
      const response = await fetch('https://dalle-48al.onrender.com/api/generate-images', {
  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, n, size })
      });

      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid response format from the API');
      }

      setImages(data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      getImages();
    }
  };

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="visual" viewBox="0 0 900 600" width="100%" height="100%" version="1.1">
        {/* SVG paths and shapes go here */}
      
      </svg>

      <header>
        <h1>AI Image Generator</h1>
      </header>

      <section className="images-section">
        {/* Images generated from API response go here */}
        {images.map((imageObject, index) => (
          <div key={index} className="image-container">
            <img src={imageObject.url} alt={`Image ${index}`} />
          </div>
        ))}
      </section>

      <section className="bottom-section">
        <div className="input-container">
          <input type="text" value={prompt} onChange={handleInputChange} onKeyPress={handleEnterKeyPress} />
          <div id="submit-icon">
            <button onClick={getImages}>Submit</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;







