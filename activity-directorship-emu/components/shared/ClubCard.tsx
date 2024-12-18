'use server'

import { formatDateTime } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"
import { ClubDeleteConfirmation } from "./ClubDeleteConfirmation"
import { IClub } from "@/lib/database/models/club.model"

type CardProps = {
  club: IClub;
};

const Card = async ({ club }: CardProps) => {
  const { sessionClaims } = await auth()
  const userId = sessionClaims?.userId as string
  const isClubPresident = userId === club.president._id;

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform hover:shadow-gray-700 hover:scale-[1.02] md:min-h-[438px] my-8">
      {/* Club Image */}
      <Link
        href={`/clubs/${club._id}`}
        style={{ backgroundImage: `url(${club.imageUrl})` }}
        className="flex-center flex-grow bg-gray-700 bg-cover bg-center text-gray-400"
      />

      {/* Club President Action Buttons */}
      {isClubPresident && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-gray-700/90 p-3 shadow-sm">
          <Link href={`/clubs/${club._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="Edit"
              width={20}
              height={20}
              className="brightness-200"
            />
          </Link>
          
        </div>
      )}

      {/* Card Content */}
      <div className="flex min-h-[240px] flex-col gap-3 p-5 md:gap-4">
        {/* Club Category */}
        <div className="flex gap-2">
          <p className="p-semibold-14 w-min rounded-full bg-gray-700/70 px-4 py-1 text-gray-300 line-clamp-1">
            {club.category?.title}
          </p>
        </div>

        {/* Club Name */}
        <p className="p-medium-16 text-gray-400">
          {club.name}
        </p>

        {/* Club President */}
        <div className="flex-between w-full">
          <Link href={`/users/${club.president._id}`}>
            <p className="p-medium-14 md:p-medium-16 text-gray-400 hover:text-gray-300">
              {club.president.username}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
