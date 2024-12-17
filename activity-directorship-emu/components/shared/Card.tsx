import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform hover:shadow-gray-700 hover:scale-[1.02] md:min-h-[438px] my-8">
      {/* Event Image */}
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-700 bg-cover bg-center text-gray-400"
      />

      {/* Event Creator Action Buttons */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-gray-700/90 p-3 shadow-sm">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="Edit"
              width={20}
              height={20}
              className="brightness-200"
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Card Content */}
      <div className="flex min-h-[240px] flex-col gap-3 p-5 md:gap-4">
        {/* Price & Category */}
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-700 px-4 py-1 text-green-300">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-700/70 px-4 py-1 text-gray-300 line-clamp-1">
              {event.category?.title}
            </p>
          </div>
        )}

        {/* Event Date */}
        <p className="p-medium-16 text-gray-400">
          {formatDateTime(event.startDate).dateTime}
        </p>

        {/* Event Title */}
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-gray-200">
          {event.title}
        </p>

        {/* Organizer & Order Link */}
        <div className="flex-between w-full">
          <Link href={`/events/${event._id}`}>
            <p className="p-medium-14 md:p-medium-16 text-gray-400 hover:text-gray-300">
              {event.organizer.username}
            </p>
          </Link>
          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="flex gap-2 items-center text-primary-400 hover:text-primary-300"
            >
              <p>Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="Arrow"
                width={10}
                height={10}
                className="brightness-200"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
