import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collections from "@/components/shared/Collections";
import { getAllEvents } from "@/lib/actions/event.actions";
import CategoryDropDown from "@/components/shared/CategoryDropdown"; // Import the client-side component

export default async function Home() {
    const events = await getAllEvents({
        query: '',
        category: '',
        page: 1,
        limit: 6,
    });

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-contain py-10 md:py-16">
                <div className="wrapper grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                    <div className="flex flex-col justify-center gap-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-800 leading-tight">
                            Join Clubs, Host Events, And Enjoy Life!
                        </h1>
                        <p className="text-lg md:text-xl text-primary-600">
                            Join +27 clubs and attend countless amazing events.
                        </p>
                        <Button
                            size="lg"
                            asChild
                            className="w-full sm:w-auto bg-primary-700 text-white hover:bg-primary-600 transition duration-300"
                        >
                            <Link href="#events">Start</Link>
                        </Button>
                    </div>

                    <Image
                        src="/assets/images/hero.png"
                        alt="Hero Image"
                        width={1000}
                        height={1000}
                        className="max-h-[70vh] object-contain object-center md:max-h-[50vh]"
                    />
                </div>
            </section>

            <section id="events" className="wrapper my-10 px-4 md:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6">
                    More Than <br />1000 Events
                </h2>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                    <div className="flex-1">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full p-3 border border-primary-300 rounded-lg text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-300"
                        />
                    </div>
                    <div className="flex-1">
                        {/* Category Filter */}
                        <CategoryDropDown />
                    </div>
                </div>

                <Collections
                    data={events?.data}
                    emptyTitle="No Events Available"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Events"
                    limit={6}
                    page={1}
                    totalPages={2}
                />
            </section>
        </>
    );
}
