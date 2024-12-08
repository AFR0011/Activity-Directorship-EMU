'use server';

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

/**
 * Create a new user in the database.
 */
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

/**
 * Update an existing user in the database by Clerk ID.
 */
export const updateUserByClerkId = async (clerkId: string, updates: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, updates, { new: true });

    if (!updatedUser) {
      throw new Error(`User with Clerk ID ${clerkId} not found`);
    }

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

/**
 * Delete a user from the database by Clerk ID.
 */
export const deleteUserByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) {
      throw new Error(`User with Clerk ID ${clerkId} not found`);
    }

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
};
