import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { validators } from '../middlewares';
import { videoService } from '../services';

// Use environment variable for upload directory or fallback to local uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

export async function create(videoData: validators.VideoIdValidator) {
  const { title, videoUrl } = videoData;

  // Ensure the uploads directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Generate a unique filename
  const filename = `${uuidv4()}.mp4`;
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    // Decode base64 video string
    const buffer = Buffer.from(videoUrl.split(',')[1] || videoUrl, 'base64');
    
    // Write to disk
    await fs.promises.writeFile(filePath, buffer);

    // Store relative path in DB
    const videoDoc = {
      title,
      videoUrl: `/videos/${filename}` // Changed to use the route we'll serve from
    };

    return await videoService.createOne(videoDoc);
  } catch (error) {
    console.error('Error saving video:', error);
    throw error;
  }
}

export async function getAll() {
  const videos = await videoService.findAll();

  return videos.map(video => ({
    ...video,
    // Use environment variable for base URL
    videoUrl: `/videos/${path.basename(video.videoUrl)}`
  }));
}