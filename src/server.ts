import cors from 'cors';
import express from 'express';
import { liveRouter, userRouter, chatRouter, videoRouter, postRouter, noteRouter } from './routes';
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from './socket/socketService';
import path from 'path';


// This function creates an express server instance and returns it.
export function createExpressServer() {
  // Initialize the app variable by creating a new Express application instance.
  const app = express();

  // Set up middleware to parse incoming urlencoded data, enable cors, and parse incoming json data respectively.
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json({ limit: '100mb' })); // Adjust for large base64 payloads
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }));
  

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  //
  app.use('/users', userRouter);
  app.use('/lives', liveRouter);
  app.use('/chats', chatRouter);
  app.use('/videos', videoRouter);
  app.use('/posts', postRouter);
  app.use('/notes', noteRouter);

  setupSocket(io);

  //
  app.use((error, _req, res, _next) => {
    res.status(error.statusCode || 500).send(error.message || '');
  });

  // Disable the "X-Powered-By" response header for security reasons.
  app.disable('x-powered-by');

  // Create a GET request route handler for /health that returns a 200 status code and a 'UP' text response.
  app.get('/health', (_req, res) => {
    res.status(200).send('UP');
  });

  // Return the configured Express application instance.
  return server;
}
