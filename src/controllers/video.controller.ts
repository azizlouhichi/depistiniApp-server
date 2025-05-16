import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { validators } from '../middlewares';
import { videoService } from '../services';

// GridFS setup
let gfs: GridFSBucket;

mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'videos'
  });
});

export async function create(videoData: validators.VideoIdValidator) {
  const { title, videoUrl } = videoData;

  if (!videoUrl) {
    throw new Error('videoUrl is required');
  }

  try {
    // Extract the base64 data (handle both with and without data: prefix)
    const base64Data = videoUrl.includes(',') 
      ? videoUrl.split(',')[1] 
      : videoUrl;
    
    if (!base64Data) {
      throw new Error('Invalid videoUrl format');
    }

    const buffer = Buffer.from(base64Data, 'base64');
    
    // Create upload stream
    const uploadStream = gfs.openUploadStream(`${title}-${Date.now()}.mp4`, {
      contentType: 'video/mp4'
    });
    
    // Write buffer to GridFS
    uploadStream.write(buffer);
    uploadStream.end();

    // Wait for upload to finish
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    // Store file ID in DB
    const videoDoc = {
      title,
      videoUrl: uploadStream.id.toString() // Store GridFS file ID
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
    videoUrl: `/videos/${video.videoUrl}` // This will be the ID for streaming
  }));
}

// Helper function to check if file exists in GridFS
export async function fileExists(id: string): Promise<boolean> {
  const files = await gfs.find({ _id: new ObjectId(id) }).toArray();
  return files.length > 0;
}