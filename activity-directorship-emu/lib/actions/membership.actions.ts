"use server";

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/database';
import Membership from '@/lib/database/models/membership.model';
import Club from '@/lib/database/models/club.model';
import User from '@/lib/database/models/user.model';
import { handleError } from '@/lib/utils';
import { DeleteMembershipParams } from '@/types';

type CreateMembershipParams = {
  userId: string;
  clubId: string;
  path: string;
};

type GetMembershipStatusParams = {
  userId: string;
  clubId: string;
};

export async function getMembershipStatus({ userId, clubId }: GetMembershipStatusParams): Promise<'approved' | 'pending' | 'none'> {
  try {
    await connectToDatabase();

    // Find the membership for the given user and club
    const membership = await Membership.findOne({ user: userId, club: clubId });

    // If no membership is found, return 'none'
    if (!membership) {
      return 'none';
    }

    // If membership is found, check the status
    if (membership.status === 'approved') {
      return 'approved';
    }

    if (membership.status === 'pending') {
      return 'pending';
    }

    // Default case if the status is unknown (shouldn't typically occur)
    return 'none';
  } catch (error) {
    handleError(error);
    return 'none';
  }
}

export async function createMembership({ userId, clubId, path }: CreateMembershipParams) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    const club = await Club.findById(clubId);

    if (!user) throw new Error('User not found');
    if (!club) throw new Error('Club not found');

    // Check for existing membership
    const existingMembership = await Membership.findOne({ user: userId, club: clubId });
    if (existingMembership) throw new Error('Membership already exists');

    // Create new membership
    const newMembership = await Membership.create({
      user: userId,
      club: clubId,
      status: 'approved',
      role: 'member', 
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newMembership));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteMembership({ userId, clubId, path }: DeleteMembershipParams) {
  try {
    await connectToDatabase();

    const deletedMembership = await Membership.findOneAndDelete({ user: userId, club: clubId });
    if (!deletedMembership) throw new Error('Membership not found');

    revalidatePath(path);
    return { success: true, message: 'Membership deleted successfully' };
  } catch (error) {
    handleError(error);
  }
}
