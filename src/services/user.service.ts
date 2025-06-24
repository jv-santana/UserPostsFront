import prisma from "../database/prisma-connection";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "../interface/user/user.request";

export class UserService {
  async createUser({ email, name }: IUserCreateRequest) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExist) {
        return {
          status: 400,
          message: "User already exists",
        };
      }

      const userCreate = await prisma.user.create({
        data: {
          email: email,
          name: name,
        },
      });

      return {
        message: "User created successfully",
        user: userCreate,
        status: 201,
      };
    } catch (error) {
      return {
        message: "Error creating user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async listUser() {
    try {
      const users = await prisma.user.findMany();

      if (!users || users.length == 0) {
        return {
          message: "No users found",
          status: 404,
          users: [],
        };
      }

      return {
        message: "Users listed successfully",
        users: users,
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error listing users",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async updateUser(id: string, { email, name }: IUserUpdateRequest) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!userExist) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      const userUpdate = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          email: email,
          name: name,
        },
      });

      return {
        message: "User updated successfully",
        userUpdated: userUpdate,
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error updating user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const userExist = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!userExist) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      const userContainsPosts = await prisma.post.findFirst({
        where: { authorId: parseInt(id) },
      });

      if (userContainsPosts) {
        return {
          message: "User cannot be deleted because they have associated posts",
          status: 400,
        };
      }

      const userDelete = await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      if (!userDelete) {
        return {
          message: "User not found",
          status: 404,
        };
      }

      return {
        message: "User deleted successfully",
        deletedUser: userDelete,
        status: 200,
      };
    } catch (error) {
      return {
        message: "Error deleting user",
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
