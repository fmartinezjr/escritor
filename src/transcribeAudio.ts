import { speechClient } from "./client";
import { google } from "@google-cloud/speech/build/protos/protos";
import dotenv  from 'dotenv';

dotenv.config();

export async function transcribeAudio(gcsUri: string) {
  const audio = {
    uri: gcsUri,
  };

  
  const request: google.cloud.speech.v1.IRecognizeRequest = {
    audio,
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 48000,
      languageCode: "en-US",
    },
  };

  try {
    const [operation] = await speechClient.longRunningRecognize(request);
    const [response] = await operation.promise();
    
    if(!response?.results){
      throw new Error("results missing. something wrong with the transcribe")
    }

    const transcription = response.results
    .map(result => result?.alternatives?.[0].transcript)
    .join('\n');

    console.log(`Transcription: ${JSON.stringify(transcription)}`);
  } catch (error) {
    console.error("Error during transcription:", error);
  }
}