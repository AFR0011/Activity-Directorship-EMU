import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collections from "@/components/shared/Collections";
import { getAllEvents } from "@/lib/actions/event.actions";
import CategoryDropDown from "@/components/shared/CategoryDropdown"; // Import the client-side component
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { getAllClubs } from "@/lib/actions/club.actions";
import ClubCollection from "@/components/shared/ClubCollections";
import ClubDropDown from "@/components/shared/ClubDropDown";

export default async function Home({ searchParams }: SearchParamProps) {
  const resSearchParams = await searchParams;
  const page = Number(resSearchParams?.page) || 1;
  const searchText = (resSearchParams?.query as string) || "";
  const category = (resSearchParams?.category as string) || "";

  const clubs = await getAllClubs({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="p-5 bg-dotted-pattern bg-contain py-10 md:py-16">
        <div className="wrapper grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-800 leading-tight">
              Join Clubs, Host Events, And Enjoy Life!
            </h1>
            <p className="text-lg md:text-xl text-primary-600">
              Join +27 clubs and attend countless amazing events.
            </p>
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-primary-500 text-white hover:bg-primary-50 transition duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              <Link
                href="#events"
                className="font-semibold text-lg md:text-xl text-white no-underline hover:text-white focus:text-primary-200 transition duration-300"
              >
                Start
              </Link>
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
          More Than <br />
          1000 Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryDropDown />
        </div>

        <ClubCollection
          data={clubs?.data}
          emptyTitle="No Clubs Available"
          emptyStateSubtext="Come back later"
          collectionType="All_Clubs"
          limit={6}
          page={page}
          totalPages={clubs?.totalPages}
        />
      </section>
    </>
  );
}
