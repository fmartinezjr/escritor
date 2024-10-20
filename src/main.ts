import { transcribeAudio } from "./transcribeAudio";
import dotenv  from 'dotenv';

dotenv.config();

if(! process.env.GCS_URL){
    throw new Error("ENV Missing!")
}

const gcsUri = process.env.GCS_URL
transcribeAudio(gcsUri);
