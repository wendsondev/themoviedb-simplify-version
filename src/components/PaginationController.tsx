import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

type PaginationControllerProps = {
  totalPages: number;
  currentPage: number;
  maxItems: number;
  setPage: (page: number) => void;
};

export function PaginationController({
  totalPages,
  currentPage,
  maxItems,
  setPage,
}: PaginationControllerProps) {
  const pages = Math.ceil(totalPages / maxItems);
  const maxLeft = Math.floor((maxItems - 1) / 2); // max items to left of current page
  const maxRight =
    totalPages - currentPage > maxLeft
      ? 0
      : maxLeft - (totalPages - currentPage); // max items to right of current page
  const firstPage = Math.max(currentPage - maxLeft, 1);

  return (
    <div className="w-full flex justify-center gap-2 my-16">
      <button
        className="font-bold p-2 text-purple-700 capitalize hover:text-purple-900 disabled:text-purple-900 dark:text-purple-600 dark:hover:text-purple-700 dark:disabled:text-purple-700"
        onClick={() => setPage(1)}
        disabled={currentPage <= 1}
      >
        first
      </button>

      <button
        className="font-bold p-2 text-purple-700 disabled:opacity-50 hover:text-purple-900 dark:text-purple-600 dark:hover:text-purple-700"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <RiArrowLeftSLine size={24} />
      </button>

      <div className="flex overflow-hidden justify-center">
        {Array.from({ length: Math.min(maxItems, pages) })
          .map((_, index) => index + firstPage - maxRight)
          .map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => setPage(page)}
                className={`font-bold py-2 px-4 text-purple-700 ${
                  page === currentPage ? 'text-2xl' : 'text-base hover:text-xl'
                } hover:text-purple-900 dark:text-purple-600 dark:hover:text-purple-700`}
              >
                {page}
              </button>
            );
          })}
      </div>

      <button
        className="font-bold p-2 text-purple-700 disabled:opacity-70 hover:text-purple-900 dark:text-purple-600 dark:hover:text-purple-700"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RiArrowRightSLine size={24} />
      </button>
      <button
        className="font-bold p-2 text-purple-700 capitalize disabled:opacity-70 hover:text-purple-900 dark:text-purple-600 dark:hover:text-purple-700"
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        last
      </button>
    </div>
  );
}
