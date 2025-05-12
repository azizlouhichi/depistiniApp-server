import ChatModel from "../models/chat.model";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Store connected users with their socket IDs
    const connectedUsers: Record<string, string> = {};

    // Join a room with userId and register user
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      connectedUsers[userId] = socket.id;
      console.log(`User ${userId} joined their personal chat room`);
    });

    // Listen for messages
    socket.on("sendMessage", async (data) => {
      const { sender, receiver, message } = data;
      console.log(data);

      try {
        // Save message to database
        const newMessage = new ChatModel({
          sender,
          receiver,
          message,
          status: "delivered" // Update status since we're delivering it
        });
        await newMessage.save();

        // Emit message to receiver
        io.to(receiver).emit("receiveMessage", {
          ...data,
          _id: newMessage._id,
          createdAt: newMessage.createdAt
        });

        // Send notification to receiver if they're online
        io.to(receiver).emit("newMessageNotification", {
          sender,
          message,
          messageId: newMessage._id,
          timestamp: newMessage.createdAt
        });


        // Update message status to "delivered"
        await ChatModel.findByIdAndUpdate(newMessage._id, { status: "delivered" });

      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    });

    // Handle message read status
    socket.on("markAsRead", async (messageId) => {
      try {
        await ChatModel.findByIdAndUpdate(messageId, { status: "read" });
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Remove user from connectedUsers
      for (const [userId, socketId] of Object.entries(connectedUsers)) {
        if (socketId === socket.id) {
          delete connectedUsers[userId];
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });
};