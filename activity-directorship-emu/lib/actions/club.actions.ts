"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Club from "../database/models/club.model"
import { getCategoryByName } from "./category.actions"
import { GetAllEventsParams, GetClubsByUserParams } from "@/types"
import User from "../database/models/user.model"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"
import Membership from "../database/models/membership.model"
 

const populateClub = (query: any) => {
    return query
      .populate({ path: 'president', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }

export const getClubs = async () => {
    try {
        await connectToDatabase();
        const clubs = await Club.find();
        return JSON.parse(JSON.stringify(clubs));
    } catch(e) {
        handleError(e)
    }
}

export async function getUserClubs({ userId, limit = 6, page }: GetClubsByUserParams) {
  try {
    await connectToDatabase();

    // Set conditions for finding memberships based on the userId
    const conditions = { userId };
    const skipAmount = (page - 1) * limit;

    // Query for memberships where the user is a member
    const membershipsQuery = Membership.find(conditions)
      .skip(skipAmount)
      .limit(limit);

    // Fetch the clubs by matching the clubIds from the memberships
    const memberships = await membershipsQuery;
    const clubIds = memberships.map(membership => membership.clubId);

    // Query the clubs using the clubIds
    const clubsQuery = Club.find({ _id: { $in: clubIds } })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const clubs = await clubsQuery;
    const clubsCount = await Membership.countDocuments(conditions);

    return { data: JSON.parse(JSON.stringify(clubs)), totalPages: Math.ceil(clubsCount / limit) };
  } catch (error) {
    handleError(error);
    throw new Error('Failed to fetch user clubs.');
  }
}


// GET ALL CLUBS
export async function getAllClubs({ query, limit = 6, page, category }: GetAllEventsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const clubsQuery = Club.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const clubs = await populateClub(clubsQuery)
      const clubsCount = await Club.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(clubs)),
        totalPages: Math.ceil(clubsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }

// DELETE CLUB
export const deleteClub = async ({ clubId, path }: { clubId: string; path: string }) => {
  try {
    await connectToDatabase();

    // Attempt to find and delete the club by ID
    const deletedClub = await Club.findByIdAndDelete(clubId);

    if (!deletedClub) {
      throw new Error("Club not found");
    }

    // Revalidate the path to ensure the UI is updated
    revalidatePath(path);

    return { success: true, message: "Club deleted successfully" };
  } catch (error) {
    handleError(error);
    return { success: false, message: "Error deleting club" };
  }
};

type GetRelatedClubsByCategoryParams = {
  categoryId: string;
  clubId: string;
  limit?: number;
  page?: number;
};

export async function getRelatedClubsByCategory({
  categoryId,
  clubId,
  limit = 3,
  page = 1,
}: GetRelatedClubsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: clubId } }] };

    const clubsQuery = Club.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const clubs = await populateClub(clubsQuery); // Reuse the populateClub function
    const clubsCount = await Club.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(clubs)),
      totalPages: Math.ceil(clubsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getClubById(clubId: string) {
  try {
    await connectToDatabase();

    // Use populateClub to fetch the club and populate related fields
    const club = await populateClub(Club.findById(clubId));

    if (!club) throw new Error("Club not found");

    return JSON.parse(JSON.stringify(club));
  } catch (error) {
    handleError(error);
  }
}