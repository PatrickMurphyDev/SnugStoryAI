const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

if (process.argv.length !== 7) {
    console.error('Usage: node script.js <tilesWide> <tilesHigh> <tileSize> <inputImagePath> <outputDir>');
    process.exit(1);
}

const [tilesWide, tilesHigh, tileSize, inputImagePath, outputDir] = process.argv.slice(2).map((arg, index) => {
    return index < 3 ? parseInt(arg, 10) : arg;
});

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Load the image
sharp(inputImagePath)
    .metadata()
    .then(metadata => {
        // Check if the image can be properly split
        if (metadata.width < tilesWide * tileSize || metadata.height < tilesHigh * tileSize) {
            throw new Error('The image is too small for the specified grid size and tile size.');
        }

        const promises = [];

        // Loop through tilesWide and tilesHigh to generate the sub-images
        for (let y = 0; y < tilesHigh; y++) {
            for (let x = 0; x < tilesWide; x++) {
                const left = x * tileSize;
                const top = y * tileSize;

                const outputFilePath = path.join(outputDir, `${x}_${y}.png`);

                const pipeline = sharp(inputImagePath)
                    .extract({ left, top, width: tileSize, height: tileSize })
                    .toFile(outputFilePath);

                promises.push(pipeline);
            }
        }

        return Promise.all(promises);
    })
    .then(() => {
        console.log('Images have been successfully generated.');
    })
    .catch(err => {
        console.error('Error:', err.message);
    });
