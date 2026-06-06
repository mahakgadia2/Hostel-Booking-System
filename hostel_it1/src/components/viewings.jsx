import { useState, useEffect } from "react";
import "/src/styles/viewings.css";

export default function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filtered = bookings.filter((b) => {
    if (tab === "all") return true;
    return b.status?.toLowerCase() === tab;
  });

  return (
    <div className="view-page">
      <div className="view-page-header">
        <h1>My Bookings</h1>
        <p>Track the status of all your room requests</p>
      </div>

      <div className="tabs">
        {["all", "pending", "completed"].map((t) => (
          <button
            key={t}
            className={tab === t ? "tab active-tab" : "tab"}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🗂</div>
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="booking-list">
          {filtered.map((booking) => (
            <div key={booking.id} className="booking-ticket">
              <div className="ticket-top">

                <div className="ticket-room-badge">
                  <div className="room-number">{booking.room_no}</div>
                  <div className="ticket-id">#{String(booking.id).padStart(4, "0")}</div>
                </div>

                <div className="ticket-meta">
                  <div className="meta-line">
                    <span className="meta-label">Hostel</span>
                    <span className="meta-value">{booking.hostel}</span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">Floor</span>
                    <span className="meta-value">{booking.floor_no}</span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">Requested</span>
                    <span className="meta-value">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="ticket-status">
                  <span className="status-label">Status</span>
                  <span className={`status-pill ${booking.status?.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {booking.status}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}