import { Timeline, List, Feedback, LineStyle, Message, Movie, PermIdentityOutlined, Report, Queue, PlaylistAdd } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
    return (
        <div className="sideBar">
            <div className="wrapper">
                <div className="menu">
                    <h2>Dashboard</h2>
                    <ul className="lists">
                        <Link to="/" className="link">

                            <li className="listItem " >
                                <LineStyle className="icon" />
                                Home
                            </li>
                        </Link>
                        <li className="listItem">
                            <Timeline className="icon" />
                            Analytics
                        </li>
                        <Link to="/users" className="link">
                            <li className="listItem " >
                                <PermIdentityOutlined className="icon" />
                                Users
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="menu">
                    <h2>Manage Movie</h2>
                    <ul className="lists">
                        <Link to="/allmovieslist" className="link">
                            <li className="listItem">
                                <Movie className="icon" />
                                Movie List
                            </li>
                        </Link>
                        <Link to="/movie/add" className="link">
                            <li className="listItem">
                                <Queue className="icon" />
                                Add New Movies
                            </li>
                        </Link>

                        <li className="listItem">
                            <Report className="icon" />
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="menu">
                    <h2>Manage Lists</h2>
                    <ul className="lists">
                        <Link to="/lists" className="link">
                            <li className="listItem " >
                                <List className="icon" />
                                Lists
                            </li>
                        </Link>
                        <Link to="/list/add" className="link">
                            <li className="listItem">
                                <PlaylistAdd className="icon" />
                                Add New List
                            </li>
                        </Link>
                        <li className="listItem">
                            <Report className="icon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
