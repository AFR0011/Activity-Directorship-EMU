import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs/server"

const CreateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-dotted-pattern bg-cover bg-center m-5 py-5 md:py-10 md:px">
        <h3 className="text-center text-white text-2xl font-extrabold md:text-3xl leading-tight text-shadow-md">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default CreateEvent;
