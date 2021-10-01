import axios from 'axios'
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from './ListAction'

//GET LISTS
export const getLists = async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(getListsStart())

    try {
        const res = await axios.get(`/lists/${user.user._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(getListsSuccess(res.data))
    } catch (error) {
        dispatch(getListsFailure())
    }
}

// //CREATE LISTS
export const createList = async (list, dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(createListStart())

    try {
        const res = await axios.post(`/lists/create/${user.user._id}`, list, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(createListSuccess(res.data))
    } catch (error) {
        dispatch(createListFailure())
    }
}

// //DELETE LIST

export const deleteList = async (id, dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'))
    dispatch(deleteListStart())

    try {
        await axios.delete(`/lists/delete/${id}/${user.user._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        dispatch(deleteListSuccess(id))
    } catch (error) {
        console.log(error.message);
        dispatch(deleteListFailure())
    }
}