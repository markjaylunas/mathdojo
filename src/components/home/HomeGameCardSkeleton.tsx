import { Skeleton } from "../ui/skeleton";

const HomeGameCardSkeleton = () => {
  return (
    <div className="min-h-56 w-full border-b-2 border-slate-300 px-8 pb-6 pt-4 dark:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-2">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-3 w-12 rounded-md" />
          </div>
        </div>
      </div>

      <div className="ml-12 mt-4 flex items-start justify-between">
        <div className="flex w-full flex-col">
          <div className="flex items-end gap-4 border-b pb-1">
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-5 w-10 rounded-md" />
          </div>

          <div className="mt-1 flex">
            <div className="flex flex-col items-start gap-2 py-2">
              <div className="flex items-center justify-center gap-1">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-5 w-10 rounded-md" />
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center justify-center gap-1">
                  <Skeleton className="size-5 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-md" />
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Skeleton className="size-5 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 pl-4">
          <Skeleton className="h-16 w-12 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomeGameCardSkeleton;
