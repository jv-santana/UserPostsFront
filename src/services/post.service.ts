import prisma from "../database/prisma-connection";
import {
  IPostCreateRequest,
  IPostUpdateRequest,
} from "../interface/post/post.request";

export class PostService {
  async createPost({ authorId, content, title }: IPostCreateRequest) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { id: authorId },
      });

      if (!userExist) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      const postCreate = await prisma.post.create({
        data: {
          authorId,
          content,
          title,
        },
      });

      return {
        message: "Post created successfully",
        status: 201,
        postCreated: postCreate,
      };
    } catch (error) {
      return {
        message: "Error updating user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async listPost() {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      if (!posts || posts.length == 0) {
        return {
          message: "No posts found",
          status: 404,
        };
      }

      return {
        message: "Posts listed successfully",
        status: 200,
        posts: posts,
      };
    } catch (error) {
      return {
        message: "Error listing posts",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async deletePost(postId: string) {
    try {
      const postExist = await prisma.post.findUnique({
        where: { id: parseInt(postId) },
      });

      if (!postExist) {
        return {
          message: "Post not found",
          status: 404,
        };
      }

      const postDeleted = await prisma.post.delete({
        where: { id: parseInt(postId) },
      });

      return {
        message: "Post deleted successfully",
        status: 200,
        postDeleted: postDeleted,
      };
    } catch (error) {
      return {
        message: "Error deleting post",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async updatePost({ content, title }: IPostUpdateRequest, postId: string) {
    try {
      const postExist = await prisma.post.findUnique({
        where: { id: parseInt(postId) },
      });

      if (!postExist) {
        return {
          message: "Post not found",
          status: 404,
        };
      }

      const postUpdated = await prisma.post.update({
        where: { id: parseInt(postId) },
        data: {
          content,
          title,
        },
      });

      return {
        message: "Post updated successfully",
        status: 200,
        postUpdated: postUpdated,
      };
    } catch (error) {
      return {
        message: "Error updating post",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
