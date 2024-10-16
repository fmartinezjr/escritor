import { transcribeAudio } from "./transcribeAudio";
import path from "path";

const mp3FilePath = path.join(process.cwd(), "output/Untitled.wav");
transcribeAudio(mp3FilePath);
