import Collections from "@/components/shared/Collections"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"


const profilePage = async () => {

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({ userId, page: 1, limit: 5 });

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href="/#events" className="button hidden sm:flex">Explore More Events</Link>
                    </Button>
                </div>
            </section>


            <section className="wrapper my-8">
                <Collections data={organizedEvents?.data} emptyTitle="No Event Tcikets Purchased Yet" emptyStateSubtext="No worries - there are many events to explore!" collectionType="My_Tickets" limit={6} page={1} urlParamName="ordersPage" totalPages={2} />
            </section>

    //Events Organized
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                        <Link href="/events/create" className="button hidden sm:flex">Create New Event</Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <Collections data={organizedEvents?.data} emptyTitle="No Event Have Been Created Yet" emptyStateSubtext="Create one now!" collectionType="Events_Organized" limit={6} page={1} urlParamName="eventsPage" totalPages={2} />
            </section>
        </>
    )
}

export default profilePage
