import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createList } from '../../../context/listContext/apiCalls'
import { ListContext } from '../../../context/listContext/ListContext'
import { getMoviesList } from '../../../context/movieContext/apiCallMovie'
import { MovieContext } from '../../../context/movieContext/MovieContext'
import './addList.scss'



const AddList = () => {

    const history = useHistory()

    const [list, setList] = useState(null)

    const { dispatch } = useContext(ListContext)
    const { movies, dispatch: dispatchMovie } = useContext(MovieContext)

    useEffect(() => {
        getMoviesList(dispatchMovie)
    }, [dispatchMovie])


    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setList({ ...list, [e.target.name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        createList(list, dispatch)
        history.push('/lists')
    }
    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value)
        setList({ ...list, [e.target.name]: value })
    }

    return (
        <div className="add-list">
            <h1 className="addProductTitle">Add New List</h1>
            <form className="addProductForm">
                <div className="left">
                    <div className="addProductItem">
                        <label>List Title</label>
                        <input type="text" placeholder="Comedy" name="title" onChange={handleChange} />
                    </div>

                    <div className="addProductItem">
                        <label>genre</label>
                        <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
                    </div>
                    <div className="addProductItem">
                        <label>Type</label>
                        <select name="type" id="type" onChange={handleChange}>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                </div>
                <div className="right">
                    <div className="addProductItem listContent">
                        <label>Content</label>
                        <select multiple name="content" id="content" onChange={handleSelect} style={{ height: "300px" }}>
                            {movies.map(movie => (
                                <option value={movie._id} key={movie._id}>{movie.title}</option>
                            ))}

                        </select>
                    </div>
                </div>
            </form>
            <button className="addProductButton" onClick={handleSubmit}>Add List</button>
        </div>
    )
}

export default AddList
