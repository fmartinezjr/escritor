import  ffmpeg  from 'fluent-ffmpeg'
import  path  from 'path';
import dotenv  from 'dotenv';
import { error } from 'console';


dotenv.config();

if(!process.env.INPUT){
    throw new Error('Missing Input');
}

if(!process.env.OUTPUT){
    throw new Error('Missing Output');
}

function convertMp3ToWav(inputPath: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat('wav')
      .on('end', () => {
        console.log('Conversion complete');
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('Error converting file:', err);
        reject(err);
      })
      .save(outputPath);
  });
}

const inputMp3 = path.join(process.env.INPUT);
const outputWav = path.join(process.env.OUTPUT);

convertMp3ToWav(inputMp3, outputWav)
  .then(() => console.log('Conveted to wav:', outputWav))
  .catch((err) => console.error('Conversion failure:', err));
