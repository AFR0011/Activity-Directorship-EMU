import { IEvent } from "@/lib/database/models/event.model"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"
import { DeleteConfirmation } from "./DeleteConfirmation"


type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean,
}


const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {

  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-full hover:shadow-lg md:min-h-[438px]">
      <Link href={`/events/${event._id}`} style={{ backgroundImage: `url(${event.imageUrl})` }} className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500" />
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[240px] flex-col gap-3 p-5 md:gap-4">

        {!hidePrice && <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-1 text-gray-500 line-clamp-1">
            {event.category?.title}
          </p>
        </div>}

        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.startDate).dateTime}
        </p>

        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>

        <div className="flex-between w-full">
          <Link href={`/events/${event._id}`}>
            <p className="p-medium-14 md:p-medium-16 text-gray-600">
              {event.organizer.username} 
            </p>
          </ Link>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="Search" width={10} height={10} />
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}

export default Card
