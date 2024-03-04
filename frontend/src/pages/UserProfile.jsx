import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const UserProfile = () => {
  const [bookings, setBookings] = useState([])
  const { user } = useContext(AuthContext)

  console.log(bookings)
  function cancelBooking(id) {
    fetch(`http://localhost:5000/api/v1/auth/bookings/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBookings((prev) => prev.filter((booking) => booking.id !== id))
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/auth/user/bookings/${user?.user?._id}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      {/* User Profile */}
      <div>{/* Display user profile details */}</div>

      {/* My Bookings */}
      <div>
        <h2>My Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.date}</td>
                <td>
                  {/* Actions for cancel and edit */}
                  <button onClick={() => cancelBooking(booking._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserProfile
