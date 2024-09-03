const axios = require('axios');
require('dotenv').config();

// Set your API key from the .env file
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Define a function to request an image from OpenAI
async function generateImage(prompt) {
    try {
        // Send a POST request to the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,  // The description for the DALL-E image
                n: 1,            // Number of images to generate
                size: "1024x1024" // The size of the image
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract the image URL from the response
        const imageUrl = response.data.data[0].url;
        console.log(`Generated image is available at: ${imageUrl}`);
        return imageUrl;
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
    }
}

// Self-invoking async function to ensure the script waits for the image generation
(async () => {
    const imageUrl = await generateImage("A futuristic city skyline at sunset");
    if (imageUrl) {
        console.log(`Image URL: ${imageUrl}`);
    } else {
        console.log("Failed to generate an image.");
    }
})();
