import React, {useState} from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet,useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unAuthedUser } from "../../slices/usersSlice";


const Header = () => {
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(unAuthedUser());
        navigate('/home');
        
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Navbar.Text>
                        UDACITY
                    </Navbar.Text>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Nav.Link as={NavLink} to="/home" className="nav-link active">Home</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link as={NavLink} to="/add" className="nav-link">New Question</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link as={NavLink} to="/leaderboard" className="nav-link">Leader Board</Nav.Link>
                            </li>
                            <Outlet />
                        </ul>
                        <div className="d-flex">
                            {users.receiveUser &&
                                <div className="dropdown">
                                    <Card.Img variant="top" src={users.receiveUser.avatarURL} className="rounded-circle mx-2" style={{ width: '40px' }} alt="Avatar" />
                                    <Navbar.Text>
                                        Hello, {users.receiveUser.name}
                                    </Navbar.Text>
                                    <Link className="btn btn-light ms-3" onClick={handleLogout}>Logout</Link>
                                </div>
                            }
                            {!users.receiveUser &&
                                <Link className="btn btn-light ms-3" to="/login">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
