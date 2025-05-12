import express from 'express';
import { videoController } from '../controllers';

export const videoRouter = express.Router();

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
