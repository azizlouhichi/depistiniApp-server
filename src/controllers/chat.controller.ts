import { validators } from "../middlewares";
import ChatModel from "../models/chat.model";
import UserModel from "../models/user.model";
import { chatService } from "../services";

export async function create(body: validators.ChatIdValidator) {
    return await chatService.createOne(body);
}

export async function getAll(sender: string, receiver: string) {
    return await chatService.getMany({ 
        $or: [
            { sender, receiver }, 
            { sender: receiver, receiver: sender }
        ] 
    });
}

export async function getUnreadCount(userId: string) {
    return await chatService.count({
        receiver: userId,
        status: { $ne: "read" }
    });
}

export async function markAsRead(sender: string, receiver: string) {
    return await chatService.updateMany(
        { sender, receiver, status: { $ne: "read" } },
        { status: "read" }
    );
}

export async function getUsersByRoleWithUnread(role: string, userId: string) {
    try {
        // First find all users with the specified role
        const users = await UserModel.find({ role }).lean();
        
        // Then get unread count and last message for each user
        const usersWithUnread = await Promise.all(
            users.map(async (user) => {
                const unreadCount = await ChatModel.countDocuments({
                    sender: user._id,
                    receiver: userId,
                    status: 'delivered'
                });
                
                const lastMessage = await ChatModel.findOne({
                    $or: [
                        { sender: user._id, receiver: userId },
                        { sender: userId, receiver: user._id }
                    ]
                })
                .sort({ createdAt: -1 })
                .select('message createdAt')
                .lean();
                
                return {
                    ...user,
                    unreadCount,
                    lastMessage: lastMessage?.message,
                    lastMessageTime: lastMessage?.createdAt
                };
            })
        );
        
        return usersWithUnread;
    } catch (error) {
        console.error('Error in getUsersByRoleWithUnread:', error);
        throw error;
    }
}