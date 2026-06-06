CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL, 
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL, 
role VARCHAR(20) NOT NULL
CHECK(role IN('student', 'admin'))
);

CREATE TABLE rooms (
id SERIAL PRIMARY KEY,
hostel VARCHAR(10) NOT NULL,
floor_no INTEGER NOT NULL,
room_no VARCHAR(20) NOT NULL
);

CREATE TABLE booking_requests (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL,
room_id INTEGER NOT NULL,
status VARCHAR(20) DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
CONSTRAINT fk_room FOREIGN KEY(room_id) REFERENCES rooms(id)
);

INSERT INTO rooms
(
    hostel,
    floor_no,
    room_no
)
VALUES
('A', 1, '101'),
('A', 1, '102'),
('A', 1, '103'),
('A', 1, '104'),
('A', 1, '105'),
('A', 1, '106'),
('A', 2, '201'),
('A', 2, '202'),
('A', 2, '203'),
('A', 2, '204'),
('A', 2, '205'),
('A', 2, '206'),
('B', 1, '101'),
('B', 1, '102'),
('B', 1, '103'),
('B', 1, '104'),
('B', 1, '105'),
('B', 1, '106'),
('B', 2, '201'),
('B', 2, '202'),
('B', 2, '203'),
('B', 2, '204'),
('B', 2, '205'),
('B', 2, '206'),
('C', 1, '101'),
('C', 1, '102'),
('C', 1, '103'),
('C', 1, '104'),
('C', 1, '105'),
('C', 1, '106'),
('C', 2, '201'),
('C', 2, '202'),
('C', 2, '203'),
('C', 2, '204'),
('C', 2, '205'),
('C', 2, '206'),
('D', 1, '101'),
('D', 1, '102'),
('D', 1, '103'),
('D', 1, '104'),
('D', 1, '105'),
('D', 1, '106'),
('D', 2, '201'),
('D', 2, '202'),
('D', 2, '203'),
('D', 2, '204'),
('D', 2, '205'),
('D', 2, '206');
