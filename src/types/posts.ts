import { Document } from "mongoose";

export interface post extends Document {
    meme: string;
    photo: ArrayBuffer;
}
export interface UploadedFile {
    path: string;
}
