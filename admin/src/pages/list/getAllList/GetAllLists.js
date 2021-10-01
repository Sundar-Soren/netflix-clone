import React, { useContext, useEffect } from 'react'
import './getAllLists.scss'
import { deleteList, getLists } from '../../../context/listContext/apiCalls';
import { ListContext } from '../../../context/listContext/ListContext'
import { Link } from 'react-router-dom'
import { DeleteOutline } from '@material-ui/icons'
const GetAllLists = () => {


    const { lists, dispatch } = useContext(ListContext)
    lists.map(list => console.log(list.title))

    useEffect(() => {
        getLists(dispatch)
    }, [])

    const handleDelete = (listId) => {

        deleteList(listId, dispatch)
    }
    return (
        <div className="lists">
            {lists.map(list => (
                <div className="container">
                    <div className="movie-id all-movie-list">{list._id}</div>

                    <div className="title all-movie-list">{list.title}</div>
                    <div className="type all-movie-list">{list.type}</div>
                    <div className="genre all-movie-list">{list.genre}</div>
                    <div className="year all-movie-list">{list.year}</div>
                    <dir className="operation-btn">
                        <Link to={{ pathname: "/list/update", state: list }} className="link" >
                            <span className="update-btn">Edit List</span>
                        </Link>
                        <span onClick={() => handleDelete(list._id)}><DeleteOutline /></span>
                    </dir>
                </div>
            ))}
        </div>
    )
}

export default GetAllLists
