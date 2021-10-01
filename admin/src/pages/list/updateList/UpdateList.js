import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './updateList.scss'

const UpdateList = () => {

    const list = useLocation().state

    const [listMovies, setListMovies] = useState([])




    useEffect(() => {
        const storeList = []
        list.content.map(movieId => {

            const getMovie = async (movieId) => {
                const user = JSON.parse(localStorage.getItem('user'))
                try {
                    const res = await axios.get(`/movie/${movieId}/${user.user._id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })
                    storeList.push(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            getMovie(movieId)
        }
        )
        setListMovies(storeList)

    }, [])


    console.log(listMovies);

    return (
        <div className="update-list">
            <h1>Update Your List</h1>

            <div className="added-movies">
                {listMovies && listMovies.map(movie => (
                    <div>{movie}</div>
                ))}
            </div>
        </div>
    )
}

export default UpdateList
