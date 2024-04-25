export default function Pagination({ className, n1, n2, search, setN1 }) {
  const classname = `flex flex-col items-center ${className}`;
  const isPrevDisabled = n1 === 0;
  const isNextDisabled = n1 + 1 === n2;
  return (
    <div className={classname}>
      <span className="text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold text-gray-900 dark:text-white">
          {n1 + 1} / {n2}
        </span>
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => {
            setN1(n1 - 1);
            search(n1 - 1);
          }}
          disabled={isPrevDisabled}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            isPrevDisabled ? "opacity-90 cursor-not-allowed" : ""
          }`}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={() => {
            setN1(n1 + 1);
            search(n1 + 1);
          }}
          disabled={isNextDisabled}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            isNextDisabled ? "opacity-90 cursor-not-allowed" : ""
          }`}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
