import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { validators } from '../middlewares';
import { videoService } from '../services';

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads'); // Adjust if needed

export async function create(videoData: validators.VideoIdValidator) {
  const { title, videoUrl } = videoData;
  // Make sure the upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  // Generate a unique filename
  const filename = `${uuidv4()}.mp4`;
  const filePath = path.join(UPLOAD_DIR, filename);

  // Decode base64 and write to disk
  const buffer = Buffer.from(videoUrl, 'base64');
  fs.writeFileSync(filePath, buffer);

  // Build the video document (matches your schema)
  const videoDoc = {
    title,
    videoUrl: `/uploads/${filename}` // This should match the public URL path
  };

  return await videoService.createOne(videoDoc);
}

export async function getAll() {
  const videos = await videoService.findAll();
  // Ensure URLs are complete
  return videos.map(video => ({
    ...video,
    videoUrl: `${process.env.BASE_URL || 'http://localhost:3000'}${video.videoUrl}`
  }));
}
