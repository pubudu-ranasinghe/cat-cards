const argv = require("minimist")(process.argv.slice(2));
const Jimp = require("jimp");
const axios = require("axios").default;

const CATAPI_BASE_URL = "https://cataas.com/cat";

// Entrypoint and catch any errors
main(argv).catch((err) => {
  console.error("Something went wrong", err);
});

/**
 * Generate a cat image with options parsed from command line arguments
 * @param {object} options Options
 */
async function main({
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
  output = "cat-card.jpg",
}) {
  const firstImage = await generateCatImage(
    width,
    height,
    greeting,
    color,
    size
  );
  const secondImage = await generateCatImage(width, height, who, color, size);
  const final = await joinImages(firstImage, secondImage);
  await final.writeAsync(output);
  console.log(`Generated cat card to ${output}!`);
}

/**
 * Generate a cat image with the given parameters using CATAAS (https://cataas.com/)
 * @param {number} width Width of image
 * @param {number} height Height of image
 * @param {string} text Overlay text
 * @param {string} textColor Overlay text color
 * @param {number} textSize Overlay text size
 * @returns {Promise<Buffer>} Image as a buffer
 */
async function generateCatImage(width, height, text, textColor, textSize) {
  const response = await axios.get(
    `${CATAPI_BASE_URL}/says/${text}?width=${width}&height=${height}&color=${textColor}&size=${textSize}`,
    {
      responseType: "arraybuffer",
    }
  );
  return Buffer.from(response.data, "binary");
}

/**
 * Join two given images
 * @param {Buffer|Jimp|string} leftImage Left side image
 * @param {Buffer|Jimp|string} rightImage Right side image
 * @returns {Promise<Jimp>} The generated image
 */
async function joinImages(leftImage, rightImage) {
  const left = await Jimp.read(leftImage);
  const right = await Jimp.read(rightImage);
  const containerWidth = left.getWidth() + right.getWidth();
  const containerHeight = Math.max(left.getHeight(), right.getHeight());
  const container = new Jimp(containerWidth, containerHeight);
  container.blit(left, 0, 0);
  container.blit(right, left.getWidth(), 0);
  return container;
}
