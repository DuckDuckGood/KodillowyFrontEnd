import inquirer from 'inquirer';
import Jimp from 'jimp';
import fs from 'fs';

const addTextWatermarkToImage = async function(inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const printParams = {
    text: text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  }

  image.print(font, 0, 0, printParams, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);
  console.log('Successfully added text watermark!');
  startApp();
}

const prepareOutputFile = inputFile => {
  const [path, name, extension] = inputFile.split('.');
  return `.${path}${name}-with-watermark.${extension}`;
}

const addImageWatermarkToImage = async function(inputFile, outputFile, watermarkFile) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);

  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;

  image.composite(
    watermark,
    x,
    y,
    {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5,
    }
  );

  await image.quality(100).writeAsync(outputFile);
  console.log('Successfully added image watermark!');
  startApp();
}

const startApp = () => {
  const files = [];
  fs.readdir('./img/', (err, readFiles) => {
    readFiles.forEach(file => files.push(file));
  });

  inquirer.prompt([
    {
      name: 'start',
      message: 'Hi! Welcome to "Watermark manager". Copy your image files to `/img` folder. Then you\'ll be able to use them in the app. Are you ready?',
      type: 'confirm'
    },
    {
      message: 'Please select command you want to execute',
      name: 'command',
      type: 'list',
      choices: ['text-watermark', 'image-watermark'],
      when: true,
    },
    {
      message: 'Select input file',
      name: 'inputFile',
      type: 'list',
      choices: files,
    },
    {
      message: 'Please type your text watermark',
      name: 'watermarkText',
      type: 'input',
      choices: files,
      when: ({command}) => command === 'text-watermark',
    },
    {
      message: 'Select watermark image',
      name: 'watermarkFile',
      type: 'list',
      choices: files,
      when: ({command}) => command === 'image-watermark',
    },
  ]).then(answers => {

    const command = answers.command;
    const inputFile = `./img/${answers.inputFile}`;

    if (command === 'text-watermark') {
      addTextWatermarkToImage(inputFile, prepareOutputFile(inputFile), answers.watermarkText);
    }

    if (command === 'image-watermark') {
      const watermarkFile = `./img/${answers.watermarkFile}`;
      addImageWatermarkToImage(inputFile, prepareOutputFile(inputFile), watermarkFile);
    }
  });
}

startApp();