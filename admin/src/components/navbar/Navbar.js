import './navbar.scss'
import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

    const handleSignOut = () => {
        console.log("I worked");
        localStorage.removeItem('user')
    }

    return (
        <>
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="left">
                        <div className="logo">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="Logo" />
                        </div>
                    </div>
                    <div className="topRight">
                        <Link to="/" className="link">
                            <div className="auth">Home</div>
                        </Link>
                        <Link to="/login" className="link">
                            <div className="auth">Log In</div>
                        </Link>
                        <div className="auth">Sign Up</div>

                        <div className="auth" onClick={handleSignOut}>Log Out</div>
                        <div className="profile-logo">

                            <img src="https://images.unsplash.com/photo-1563987219716-dac41f2d0b3a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYXV0aWZ1bCUyMGdpcmx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Top Avatar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    )
}

export default Navbar
