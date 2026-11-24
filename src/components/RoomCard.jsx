import React from "react";

export default function RoomCard({ room, onView }) {
  return (
    <article className="room-card">
      <img
        src={room.image}
        alt={room.title}
      />

      <div className="room-info">
        <div className="room-type">
          {room.type}
        </div>

        <h3>
          {room.title}
        </h3>

        <p className="muted">
          ⌖ {room.location}
        </p>

        <div className="room-bottom">
          <strong>
            ₹{Number(room.rent).toLocaleString("en-IN")}{" "}
            <small>/ month</small>
          </strong>

          <button
            className="btn btn-small"
            onClick={() => onView(room)}
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}