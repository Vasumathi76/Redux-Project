import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../components/RoomCard";
import { addRequest } from "../redux/bookingSlice";

export default function Rooms() {
  const rooms = useSelector((state) => state.rooms.items);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [maxRent, setMaxRent] = useState("30000");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(
    () =>
      rooms.filter(
        (room) =>
          (
            room.location.toLowerCase().includes(search.toLowerCase()) ||
            room.title.toLowerCase().includes(search.toLowerCase())
          ) &&
          Number(room.rent) <= Number(maxRent)
      ),
    [rooms, search, maxRent]
  );

  function requestRoom() {
    dispatch(
      addRequest({
        roomId: selected.id,
        roomTitle: selected.title,
        location: selected.location,
        rent: selected.rent,
        userName: user.name,
        userEmail: user.email,
      })
    );

    setMessage("Your request has been sent to the admin!");
    setSelected(null);

    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <main className="page">

      <section className="page-heading">
        <div>
          <span className="eyebrow">EXPLORE RENTALS</span>

          <h1>Find your perfect space.</h1>

          <p className="muted">
            Browse rooms and apartments available for rent.
          </p>
        </div>

        <div className="heading-icon">
          ⌂
        </div>
      </section>


      {message && (
        <div className="success-msg">
          {message}
        </div>
      )}


      <section className="search-panel">

        <div className="field">
          <label>Search by city or room</label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try Coimbatore, Chennai..."
          />
        </div>


        <div className="field">
          <label>Maximum monthly rent</label>

          <select
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          >
            <option value="10000">₹10,000</option>
            <option value="15000">₹15,000</option>
            <option value="20000">₹20,000</option>
            <option value="30000">Any price</option>
          </select>
        </div>

      </section>


      <div className="section-row">
        <h2>Available rooms</h2>

        <span className="muted">
          {filtered.length} properties found
        </span>
      </div>


      <div className="room-grid">
        {filtered.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onView={setSelected}
          />
        ))}
      </div>


      {filtered.length === 0 && (
        <div className="empty">
          No rooms match your search. Try another city or rent range.
        </div>
      )}


      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>


            <img
              className="modal-image"
              src={selected.image}
              alt={selected.title}
            />


            <span className="room-type">
              {selected.type}
            </span>


            <h2>
              {selected.title}
            </h2>


            <p className="muted">
              ⌖ {selected.location}
            </p>


            <h3 className="price">
              ₹{Number(selected.rent).toLocaleString("en-IN")} / month
            </h3>


            <p>
              {selected.description}
            </p>


            <button
              className="btn full"
              onClick={requestRoom}
            >
              Send booking request
            </button>

          </div>
        </div>
      )}

    </main>
  );
}