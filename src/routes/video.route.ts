import express from 'express';
import { videoController } from '../controllers';
import fs from 'fs';
import path from 'path';

export const videoRouter = express.Router();

// Serve video files directly
videoRouter.get('/:filename', (req, res) => {
  const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    if (range) {
      // Handle partial content for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
      
      const chunksize = (end-start)+1;
      const file = fs.createReadStream(filePath, {start, end});
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.status(404).send('Video not found');
  }
});

// Existing routes
videoRouter.post('/', async (req, res) => {
  try {
    const { body } = req;
    const result = await videoController.create(body);
    res.status(201).json({ message: "Video uploaded successfully", video: result });
  } catch (error) {
    console.log('Upload Error:', error);
    res.status(500).json({ message: "Failed to upload video", error: error });
  }
});

videoRouter.get('/', async (req, res) => {
  try {
    const videos = await videoController.getAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos", error: error });
  }
});