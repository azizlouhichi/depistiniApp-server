import express from 'express';
import { videoController } from '../controllers';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const videoRouter = express.Router();

// GridFS streaming endpoint
videoRouter.get('/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    
    // Validate ObjectId
    if (!ObjectId.isValid(fileId)) {
      return res.status(400).send('Invalid video ID');
    }

    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'videos'
    });

    const files = await gfs.find({ _id: new ObjectId(fileId) }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).send('Video not found');
    }

    const file = files[0];
    const range = req.headers.range;
    
    if (range) {
      // Handle partial content for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file.length-1;
      
      const chunksize = (end-start)+1;
      const head = {
        'Content-Range': `bytes ${start}-${end}/${file.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': file.contentType,
      };
      
      res.writeHead(206, head);
      gfs.openDownloadStream(file._id, { start, end }).pipe(res);
    } else {
      const head = {
        'Content-Length': file.length,
        'Content-Type': file.contentType,
      };
      res.writeHead(200, head);
      gfs.openDownloadStream(file._id).pipe(res);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).send('Error streaming video');
  }
});

// Existing routes (unchanged)
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