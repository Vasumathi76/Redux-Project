import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, deleteRoom } from "../redux/roomSlice";
import { updateStatus } from "../redux/bookingSlice";

const blank = {
  title: "",
  location: "",
  rent: "",
  type: "1 BHK",
  image: "",
  description: "",
};

export default function Admin() {
  const [form, setForm] = useState(blank);
  const [showForm, setShowForm] = useState(false);

  const rooms = useSelector((state) => state.rooms.items);
  const bookings = useSelector((state) => state.bookings.items);

  const dispatch = useDispatch();

  function submitRoom(e) {
    e.preventDefault();

    dispatch(
      addRoom({
        ...form,
        rent: Number(form.rent),
        image:
          form.image ||
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900",
      })
    );

    setForm(blank);
    setShowForm(false);
  }

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">CONTROL CENTER</span>
          <h1>Admin Dashboard</h1>
          <p className="muted">
            Manage property listings and user requests.
          </p>
        </div>

        <button
          className="btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add New Room"}
        </button>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Rooms</span>
          <b>{rooms.length}</b>
        </div>

        <div className="stat-card">
          <span>Total Requests</span>
          <b>{bookings.length}</b>
        </div>

        <div className="stat-card">
          <span>Pending Requests</span>
          <b>
            {
              bookings.filter(
                (booking) => booking.status === "Pending"
              ).length
            }
          </b>
        </div>
      </div>

      {showForm && (
        <form
          className="admin-form"
          onSubmit={submitRoom}
        >
          <h2>Add a Property</h2>

          <div className="form-grid">
            <div>
              <label>Room Title</label>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Example: Cozy city apartment"
              />
            </div>

            <div>
              <label>Location</label>
              <input
                required
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="City name"
              />
            </div>

            <div>
              <label>Monthly Rent (₹)</label>
              <input
                required
                type="number"
                min="1"
                value={form.rent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rent: e.target.value,
                  })
                }
                placeholder="8500"
              />
            </div>

            <div>
              <label>Room Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
              >
                <option>Single Room</option>
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
              </select>
            </div>

            <div className="wide">
              <label>Image URL (Optional)</label>
              <input
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>

            <div className="wide">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the property..."
              />
            </div>
          </div>

          <button
            className="btn"
            type="submit"
          >
            Save Room
          </button>
        </form>
      )}

      <section className="admin-section">
        <div className="section-row">
          <h2>Room Listings</h2>

          <span className="muted">
            {rooms.length} total
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Location</th>
                <th>Monthly Rent</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.title}</td>

                  <td>{room.location}</td>

                  <td>
                    ₹{Number(room.rent).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <button
                      className="text-danger"
                      onClick={() =>
                        dispatch(deleteRoom(room.id))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section">
        <div className="section-row">
          <h2>Booking Requests</h2>

          <span className="muted">
            {bookings.length} total
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="empty">
            No booking requests yet.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Property</th>
                  <th>Rent</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      {booking.userName}

                      <small className="table-sub">
                        {booking.userEmail}
                      </small>
                    </td>

                    <td>
                      {booking.roomTitle}

                      <small className="table-sub">
                        {booking.location}
                      </small>
                    </td>

                    <td>
                      ₹{Number(booking.rent).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      {booking.status === "Pending" ? (
                        <div className="action-group">
                          <button
                            className="approve"
                            onClick={() =>
                              dispatch(
                                updateStatus({
                                  id: booking.id,
                                  status: "Approved",
                                })
                              )
                            }
                          >
                            Accept
                          </button>

                          <button
                            className="reject"
                            onClick={() =>
                              dispatch(
                                updateStatus({
                                  id: booking.id,
                                  status: "Rejected",
                                })
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}