import { useSelector } from "react-redux";

const Dashboard = () => {

    const { bookings } = useSelector((state) => state.bookings);

    return (
        <section>
            <div className="w-full px-6 py-4 md:py-6 flex items-center justify-between md:border-b md:border-gray-200">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Booked Tickets</h2>
                <div className="bg-gray-100 text-teal-900 rounded px-3 py-1 text-lg">
                    Total: {bookings ? bookings.length : 0}
                </div>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-2 md:py-6">
                {
                    bookings.map((ticket, index) => (
                        <li key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">Movie: {ticket?.movieName}</h3>
                            <p className="text-sm text-gray-600">User: {ticket?.name}</p>
                            <p className="text-sm text-gray-600">Email: {ticket?.email}</p>
                            <p className="text-sm text-gray-600">Showtime: {ticket?.date} at {ticket?.time}</p>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default Dashboard;