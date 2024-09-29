import { transcribeAudio } from "./transcribeAudio";
import path from "path";

const mp3FilePath = path.join(__dirname, "file.mp3");
transcribeAudio(mp3FilePath);
