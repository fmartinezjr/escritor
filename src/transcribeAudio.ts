import fs from "fs";
import { speechClient } from "./client";
import { google } from "@google-cloud/speech/build/protos/protos";
import dotenv  from 'dotenv';

dotenv.config();

export async function transcribeAudio(mp3FilePath: string) {
  const audioBuffer = fs.readFileSync(mp3FilePath);

  const audioBytes = audioBuffer.toString("base64");

  const request: google.cloud.speech.v1.IRecognizeRequest = {
    audio: {
      content: audioBytes,
    },
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    },
  };

  try {
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      ?.map((result) => result.alternatives?.[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
  } catch (error) {
    console.error("Error during transcription:", error);
  }
}