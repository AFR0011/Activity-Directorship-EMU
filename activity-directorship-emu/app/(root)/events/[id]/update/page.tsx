import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server"

type UpdateEventProps = {
  params: Promise<{
    id: string
  }>
}

const UpdateEvent = async ({ params: rawParams }: UpdateEventProps) => {
  
  const { sessionClaims } = await auth();

  const params = await rawParams;
  const userId = sessionClaims?.userId as string;
  const event = await getEventById(params.id);
  console.log(event);

  return (

    <>
      <section className="bg-dotted-pattern bg-cover bg-center m-5 py-5 md:py-10 md:px">
        <h3 className="text-center text-white text-2xl font-extrabold md:text-3xl leading-tight text-shadow-md">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" event={event} eventId={event._id}/>
      </div>

    </>
  ) 
}


export default UpdateEvent