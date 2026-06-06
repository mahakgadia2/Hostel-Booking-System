import {NavLink} from "react-router-dom"
import {useState} from "react"
import "/src/styles/App.css"

export default function Navbar(){
    const[open, setOpen] = useState(false)
    const userName = localStorage.getItem("name")
    return(
        <nav className="navbar">
            <div className="logo">

            </div>
            <div className = "nav-links">
                <NavLink
                    to = "/"
                    className = {({isActive}) => 
                        isActive ? "nav-item active" : "nav-item"}
                >
                Book Room                    
                </NavLink>
                <NavLink
                    to = "/view-rooms"
                    className = {({isActive}) =>
                    isActive ? "nav-item active" : "nav-item"}                       
                >
                View Rooms
                </NavLink>

            <div className="profile">
                <button 
                    className="profile-btn"
                    onClick={() => {setOpen(!open); console.log("hii")}}                                     
                >
                   { userName  }

                </button>
                {open && (
                    <div className="dropdown">
                        <button onClick={() => {console.log("yayy")}}> whats uppp</button>
                        <button
                            onClick={() => {
                                console.log("clicked")
                                localStorage.clear();
                                window.location.reload();
                            }}
                            >
                            Log Out
                        </button>

                    </div>

                )
                }
            </div>

            </div>

        </nav>
    )
}

