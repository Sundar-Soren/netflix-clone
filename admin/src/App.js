import React from 'react'
import './app.scss'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Users from './pages/users/Users'
import Login from './components/auth/Login'
import { useContext } from 'react'
import { AuthContext } from './context/authContext/AuthContext'
import AllMoviesList from './pages/movie/allMovies/AllMoviesList'
import UpdateMovie from './pages/movie/updateMovie/UpdateMovie'
import AddMovie from './pages/movie/addMovies/AddMovie'
import GetAllLists from './pages/list/getAllList/GetAllLists'
import AddList from './pages/list/addList/AddList'
import UpdateList from './pages/list/updateList/UpdateList'

const App = () => {


    const { user } = useContext(AuthContext)


    return (

        <Router>
            <Navbar />
            <Switch>
                {!user && (<Route exact path="/login"><Login /></Route>)}

                {user ? (<div className="main-container">
                    <div className="side-bar-comp">
                        <Sidebar />
                    </div>

                    <div className="content-comp">
                        <Route exact path="/"> <Home /></Route>
                        <Route exact path="/users"> <Users /></Route>
                        <Route exact path="/allmovieslist"> <AllMoviesList /></Route>
                        <Route exact path="/movie/add"> <AddMovie /></Route>
                        <Route exact path="/movie/update"> <UpdateMovie /></Route>
                        <Route exact path="/lists"> <GetAllLists /></Route>
                        <Route exact path="/list/add"> <AddList /></Route>
                        <Route exact path="/list/update"> <UpdateList /></Route>
                    </div>

                </div>) : <Redirect to="/login" />}

            </Switch>
        </Router>
    )
}

export default App
