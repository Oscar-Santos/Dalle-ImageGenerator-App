
const submitIcon = document.querySelector('#submit-icon');
const inputElement = document.querySelector('input');
const imageSection = document.querySelector('.images-section');

const getImages = async () => {
  const prompt = inputElement.value;
  const n = 4;
  const size = '1024x1024';

  try {
    const response = await fetch('http://localhost:3001/api/generate-images', {
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

    data.data.forEach((imageObject) => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', imageObject.url);
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);
    });
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

submitIcon.addEventListener('click', getImages);
inputElement.addEventListener('keypress', handleEnterKeyPress);
