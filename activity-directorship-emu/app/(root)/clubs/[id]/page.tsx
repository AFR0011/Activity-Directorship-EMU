import MembershipButton from "@/components/shared/MembershipButton";
import Collections from "@/components/shared/Collections";
import {
  getClubById,
  getRelatedClubsByCategory,
} from "@/lib/actions/club.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import ClubCollection from "@/components/shared/ClubCollections";
import { auth } from "@clerk/nextjs/server"

const ClubDetails = async ({
  params: rawParams,
  searchParams: rawSearchParams,
}: SearchParamProps) => {
  const params = await rawParams;
  const searchParams = await rawSearchParams;

  // Fetch user session to get the userId
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string; // Get userId from sessionClaims

  // Fetch club details and related clubs
  const club = await getClubById(params.id);
  const relatedClubs = await getRelatedClubsByCategory({
    categoryId: club.categoryId,
    clubId: club._id,
    page: parseInt(searchParams.page as string) || 1,
    limit: 5,
  });

  return (
    <>
      {/* Club Details Section */}
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={club.imageUrl}
            alt="Club Image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{club.name}</h2>

              {/* Club Category and President */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                    {club.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  President:{" "}
                  <span className="text-primary-500">
                    {club.president?.firstName} {club.president?.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* Membership Button */}
            {userId && (
              <MembershipButton
                clubId={club._id}
                userId={userId}  // Pass userId
                path={`/clubs/${club._id}`}  // Pass path for revalidation
              />
            )}

            {/* Club Description */}
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-gray-600">About the Club:</p>
              <p className="p-medium-16 lg:p-regular-18">{club.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Clubs Section */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Clubs</h2>
        <ClubCollection
          data={Array.isArray(relatedClubs?.data) ? relatedClubs?.data : []}
          emptyTitle="No Related Clubs"
          emptyStateSubtext="Check back later for more clubs."
          collectionType="All_Clubs"
          limit={5}
          page={parseInt(searchParams.page as string) || 1}
          totalPages={relatedClubs?.totalPages || 0}
        />
      </section>
    </>
  );
};

export default ClubDetails;
