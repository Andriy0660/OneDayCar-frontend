import BookingsTableItem from "./MyBookingsTableItem";

// const data = [
//   {
//     firstName: "Skye",
//     lastName: "Jakubowski",
//     startDate: "April",
//     endDate: "October",
//     status: "female",
//     id: "1",
//   },
//   {
//     firstName: "Emmie",
//     lastName: "Spinka",
//     startDate: "April",
//     endDate: "November",
//     status: "male",
//     id: "2",
//   },
//   {
//     firstName: "Vergie",
//     lastName: "Yost",
//     startDate: "December",
//     endDate: "November",
//     status: "created",
//     id: "3",
//   },
//   {
//     firstName: "Bernita",
//     lastName: "Altenwerth",
//     startDate: "November",
//     endDate: "October",
//     status: "female",
//     id: "4",
//   },
//   {
//     firstName: "Lance",
//     lastName: "Streich",
//     startDate: "June",
//     endDate: "November",
//     status: "male",
//     id: "5",
//   },
//   {
//     firstName: "Colleen",
//     lastName: "D'Amore",
//     startDate: "June",
//     endDate: "September",
//     status: "female",
//     id: "6",
//   },
//   {
//     firstName: "Olen",
//     lastName: "Harvey",
//     startDate: "February",
//     endDate: "December",
//     status: "male",
//     id: "7",
//   },
//   {
//     firstName: "Jamarcus",
//     lastName: "Connelly",
//     startDate: "February",
//     endDate: "February",
//     status: "male",
//     id: "8",
//   },
//   {
//     firstName: "Emelia",
//     lastName: "Reynolds",
//     startDate: "October",
//     endDate: "December",
//     status: "male",
//     id: "9",
//   },
//   {
//     firstName: "Ocie",
//     lastName: "Leuschke",
//     startDate: "January",
//     endDate: "August",
//     status: "male",
//     id: "10",
//   },
//   {
//     firstName: "Jade",
//     lastName: "Schuppe",
//     startDate: "December",
//     endDate: "December",
//     status: "male",
//     id: "11",
//   },
//   {
//     firstName: "Alayna",
//     lastName: "Stamm",
//     startDate: "June",
//     endDate: "August",
//     status: "female",
//     id: "12",
//   },
//   {
//     firstName: "Jean",
//     lastName: "Kuhn",
//     startDate: "December",
//     endDate: "September",
//     status: "rejected",
//     id: "13",
//   },
//   {
//     firstName: "Donald",
//     lastName: "Flatley",
//     startDate: "August",
//     endDate: "July",
//     status: "female",
//     id: "14",
//   },
//   {
//     firstName: "Brenda",
//     lastName: "Morissette",
//     startDate: "July",
//     endDate: "September",
//     status: "female",
//     id: "15",
//   },
//   {
//     firstName: "Kellie",
//     lastName: "Gorczany",
//     startDate: "June",
//     endDate: "March",
//     status: "female",
//     id: "16",
//   },
//   {
//     firstName: "Elliot",
//     lastName: "Emard",
//     startDate: "May",
//     endDate: "March",
//     status: "male",
//     id: "17",
//   },
// ];

export default function MyBookingsTable({ bookings }) {
  const renderedBookings = bookings.map((booking) => {
    return <BookingsTableItem key={booking.id} booking={booking} />;
  });
  return (
    <section className="container px-4 mx-auto">
      <div className="lg:mx-32 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Owner
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Car
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {renderedBookings}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
