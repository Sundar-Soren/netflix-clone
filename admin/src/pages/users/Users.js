import { Visibility } from '@material-ui/icons'
import './users.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            const user = JSON.parse(localStorage.getItem('user'))

            console.log(user);
            try {
                const res = await axios.get(`/users/${user.user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setUsers(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllUsers()

    }, [])

    return (
        <div className="smallWidgets">
            <div className="wrapper">
                <h3>New Join Members</h3>

                <div className="main-container">
                    {users.map(user => (

                        <>
                            <div className="container">
                                <div className="profilePic">
                                    <img src={user.profliePic || "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} alt="Profile pic" />
                                </div>
                                <div className="details">
                                    <span>{user.username}</span>
                                </div>
                                <div className="display">
                                    <Visibility className="icon" />
                                    Displays
                                </div>
                            </div>
                        </>
                    ))}




                </div>

                {/* {users.map((user) => (
                    <>
                        <div className="container">
                            <div className="profilePic">
                                <img src={user.profilePic || "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} alt="" />
                            </div>
                            <div className="details">
                                <span>{user.username}</span>
                            </div>
                            <div className="display">
                                <Visibility className="icon" />
                                Displays
                            </div>
                        </div>
                    </>
                ))} */}

            </div>
        </div>
    )
}

export default Users
