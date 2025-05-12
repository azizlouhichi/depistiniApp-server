import { Request } from 'express';
import { ResponseType } from '../types';
import PostModel from '../models/post.model';
import { postService } from '../services';
import UserModel from '../models/user.model';

export async function addComment(req: Request, res: ResponseType<any>) {
  const { postId } = req.params;
  const { userId, content } = req.body;

  const updatedPost = await PostModel.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: {
          userId,
          content,
        },
      },
    },
    { new: true }
  );

  if (!updatedPost) {
    return res.status(404).send({ message: 'Post not found' });
  }

  res.status(201).send(updatedPost);
}

export async function getComments(req: Request, res: ResponseType<any>) {
  const { postId } = req.params;

  try {
    // First get the post with comments
    const post = await PostModel.findById(postId).lean().exec();
    

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    // If there are no comments, return empty array
    if (!post.comments || post.comments.length === 0) {
      return res.status(200).send([]);
    }

    // Get user details for all comment authors
    const userIds = post.comments.map(c => c.userId);
    const users = await UserModel.find(
      { _id: { $in: userIds } },
      { userName: 1, role: 1 }
    ).lean().exec();

    // Create a user map for quick lookup
    const userMap = users.reduce((map, user) => {
      map[user._id.toString()] = user;
      return map;
    }, {});

    // Enrich comments with user data
    const enrichedComments = post.comments.map(comment => ({
      ...comment,
      user: userMap[comment.userId.toString()] || {
        name: 'Unknown',
        role: ''
      }
    }));

    res.status(200).send(enrichedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send({ message: 'Error fetching comments' });
  }
}