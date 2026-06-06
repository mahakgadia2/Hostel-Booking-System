import { useState, useEffect } from "react";
import "/src/styles/booking.css";

export default function BookRoom() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [approvedRooms, setApprovedRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
 
    fetch("http://localhost:5000/bookings/approved-rooms")
    .then((res) => res.json())
    .then((data) => setApprovedRooms(data))
    .catch((error) => console.error(error))  
  
  },  []);

  const hostels = [...new Set(rooms.map((r) => r.hostel))];
  const floors = [...new Set(
    rooms.filter((r) => r.hostel === selectedHostel).map((r) => r.floor_no)
  )];
  const filteredRooms = rooms.filter(
    (r) => r.hostel === selectedHostel && r.floor_no === selectedFloor
  );

  function isRoomApproved(booking_id){
    return approvedRooms.some(
        (room) => room.room_id === booking_id
    )
  }

  async function handleBooking() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ room_id: selectedRoom.id }),
      });
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      alert("Booking request submitted successfully");
      setSelectedHostel(null);
      setSelectedFloor(null);
      setSelectedRoom(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit booking");
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Book a Room</h1>
        <p>Pick your hostel, floor, and room to submit a request</p>
      </div>

      <div className="booking-layout">

        
        <div className="booking-main">

          
          <div className="step-card">
            <div className="step-card-header">
              <div className={`step-number ${selectedHostel ? "done" : "active"}`}>
                {selectedHostel ? "✓" : "1"}
              </div>
              <div className="step-card-title">
                <h3>Choose Hostel</h3>
                {selectedHostel
                  ? <p>Hostel {selectedHostel} selected</p>
                  : <p>Choose the hostel you want</p>}
              </div>
            </div>
            <div className="step-card-body">
              <div className="hostel-grid">
                {hostels.map((hostel) => (
                  <div
                    key={hostel}
                    className={selectedHostel === hostel ? "hostel-card selected" : "hostel-card"}
                    onClick={() => {
                      setSelectedHostel(hostel);
                      setSelectedFloor(null);
                      setSelectedRoom(null);
                    }}
                  >
                    <span className="hostel-name">Hostel {hostel}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="step-card">
            <div className="step-card-header">
              <div className={`step-number ${selectedFloor ? "done" : selectedHostel ? "active" : ""}`}>
                {selectedFloor ? "✓" : "2"}
              </div>
              <div className="step-card-title">
                <h3>Choose Floor</h3>
                {selectedFloor
                  ? <p>Floor {selectedFloor} selected</p>
                  : <p>Select a floor in your hostel</p>}
              </div>
            </div>
            {selectedHostel && (
              <div className="step-card-body">
                <div className="floor-grid">
                  {floors.map((floor) => (
                    <div
                      key={floor}
                      className={selectedFloor === floor ? "floor-card selected-floor" : "floor-card"}
                      onClick={() => {
                        setSelectedFloor(floor);
                        setSelectedRoom(null);
                      }}
                    >
                      {floor}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          
          <div className="step-card">
            <div className="step-card-header">
              <div className={`step-number ${selectedRoom ? "done" : selectedFloor ? "active" : ""}`}>
                {selectedRoom ? "✓" : "3"}
              </div>
              <div className="step-card-title">
                <h3>Choose Room</h3>
                {selectedRoom
                  ? <p>Room {selectedRoom.room_no} selected</p>
                  : <p>Pick an available room</p>}
              </div>
            </div>
            {selectedFloor && (
              <div className="step-card-body">
                <div className="room-legend">
                  <div className="legend-item"><div className="legend-dot dot-available" />Available</div>
                  <div className="legend-item"><div className="legend-dot dot-occupied" />Occupied</div>
                  <div className="legend-item"><div className="legend-dot dot-selected" />Selected</div>
                </div>
                <div className="room-grid">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className = {
                        isRoomApproved(room.id)
                        ? "room-card occupied-room"
                        : selectedRoom?.id===room.id 
                        ?"room-card selected-room"
                        :"room-card"
                        }
                      onClick={() => !isRoomApproved(room.id) && setSelectedRoom(room)}
                    >
                      {room.room_no}
                      
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        
        <div className="booking-aside">
          <div className="booking-summary">
            <div className="summary-header">
              <h2>Booking Summary</h2>
            </div>
            <div className="summary-body">
              <div className="summary-item">
                <span>Hostel</span>
                <strong className={!selectedHostel ? "placeholder" : ""}>
                  {selectedHostel ? `Hostel ${selectedHostel}` : "Not selected"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Floor</span>
                <strong className={!selectedFloor ? "placeholder" : ""}>
                  {selectedFloor ? `Floor ${selectedFloor}` : "Not selected"}
                </strong>
              </div>
              <div className="summary-item">
                <span>Room</span>
                <strong className={!selectedRoom ? "placeholder" : ""}>
                  {selectedRoom ? `Room ${selectedRoom.room_no}` : "Not selected"}
                </strong>
              </div>
            </div>
            <div className="summary-footer">
              <button
                className="confirm-btn"
                disabled={!selectedRoom}
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
              {!selectedRoom && (
                <p className="confirm-hint">Complete all steps to continue</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}