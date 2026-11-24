import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelRequest } from "../redux/bookingSlice";

export default function MyRequests() {
  const user = useSelector((state) => state.auth.user);

  const bookings = useSelector((state) => state.bookings.items).filter(
    (b) => b.userEmail === user.email
  );

  const dispatch = useDispatch();

  return (
    <main className="page">
      <section className="page-heading">
        <div>
          <span className="eyebrow">YOUR ACTIVITY</span>
          <h1>My booking requests</h1>
          <p className="muted">
            Track the status of your room requests.
          </p>
        </div>
      </section>

      {bookings.length === 0 ? (
        <div className="empty">
          You have not sent any booking requests yet.{" "}
          <a href="/rooms">Browse rooms</a>.
        </div>
      ) : (
        <div className="request-list">
          {bookings.map((b) => (
            <article className="request-card" key={b.id}>
              <div>
                <span className={`status ${b.status.toLowerCase()}`}>
                  {b.status}
                </span>

                <h3>{b.roomTitle}</h3>

                <p className="muted">
                  {b.location} · ₹
                  {Number(b.rent).toLocaleString("en-IN")} / month
                </p>
              </div>

              {b.status === "Pending" && (
                <button
                  className="btn btn-outline btn-small"
                  onClick={() => dispatch(cancelRequest(b.id))}
                >
                  Cancel request
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}