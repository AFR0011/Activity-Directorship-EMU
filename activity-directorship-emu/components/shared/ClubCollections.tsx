import { IClub } from "@/lib/database/models/club.model";
import Pagination from "./Pagination";
import ClubCard from "./ClubCard";

type CollectionProps = {
  data: IClub[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Clubs_Organized" | "All_Clubs" | "My_Clubs";
};

const ClubCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((club) => {
              return (
                <li key={club._id} className="flex justify-center">
                  <ClubCard club={club} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamname={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-card py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold text-foreground">{emptyTitle}</h3>
          <p className="p-regular-14 text-muted-foreground">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default ClubCollection;
