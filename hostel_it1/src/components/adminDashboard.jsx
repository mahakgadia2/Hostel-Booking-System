import { useState, useEffect } from "react";
import "/src/styles/admin.css";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/bookings/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function approveBooking(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/bookings/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchBookings();
    } catch (error) { console.error(error); }
  }

  async function rejectBooking(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/bookings/${id}/reject`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchBookings();
    } catch (error) { console.error(error); }
  }

  const total    = bookings.length;
  const pending  = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;

  const filtered = bookings.filter((b) => {
    if (tab === "all") return true;
    return b.status?.toLowerCase() === tab;
  });

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div className="header-row">
            <h1>Admin Dashboard</h1>
            <button className="logout-btn" onClick = {() => {localStorage.clear(); window.location.reload()}}>Log Out</button>
        </div>
        
        <p>Review and manage all student booking requests</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-label">Total Requests</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value pending">{pending}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Approved</div>
          <div className="stat-value approved">{approved}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["all", "pending", "approved", "rejected"].map((t) => (
          <button
            key={t}
            className={tab === t ? "tab active-tab" : "tab"}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No {tab === "all" ? "" : tab} booking requests found.</p>
        </div>
      ) : (
        <div className="admin-list">
          {filtered.map((booking) => (
            <div key={booking.id} className="admin-card">
              <div className="admin-card-top">

                <div className="admin-room-badge">
                  <div className="admin-room-number">{booking.room_no}</div>
                  <div className="admin-booking-id">#{String(booking.id).padStart(4, "0")}</div>
                </div>

                <div className="admin-card-meta">
                  <div className="meta-line">
                    <span className="meta-label">Student</span>
                    <span className="meta-value">{booking.name}</span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">Email</span>
                    <span className="meta-value">{booking.email}</span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">Location</span>
                    <span className="meta-value">
                      Hostel {booking.hostel} · Floor {booking.floor_no}
                    </span>
                  </div>
                  <div className="meta-line">
                    <span className="meta-label">Requested</span>
                    <span className="meta-value">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="admin-card-status">
                  <span className={`status-pill ${booking.status?.toLowerCase()}`}>
                    <span className="status-dot" />
                    {booking.status}
                  </span>
                </div>

              </div>

              {booking.status === "pending" && (
                <div className="admin-card-actions">
                  <button className="btn-approve" onClick={() => approveBooking(booking.id)}>
                    ✓ Approve
                  </button>
                  <button className="btn-reject" onClick={() => rejectBooking(booking.id)}>
                    ✕ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}