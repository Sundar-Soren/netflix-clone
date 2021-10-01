import { Link, useLocation } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import './updateMovie.scss'
import { MovieContext } from "../../../context/movieContext/MovieContext";
import { useContext, useState } from "react";
import storage from "../../../firebase";
import { updateTheMovie } from "../../../context/movieContext/apiCallMovie";
export default function UpdateMovie() {

    const location = useLocation()
    const movie = location.state

    const { dispatch } = useContext(MovieContext)

    const [updateMovie, setUpdateMovie] = useState(null)
    const [imgTitle, setImgTitle] = useState(null)
    const [imgThumb, setImgThumb] = useState(null)
    const [trailer, setTrailer] = useState(null)
    const [video, setVideo] = useState(null)
    const [progress, setProgress] = useState(0)


    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setUpdateMovie({ ...updateMovie, [e.target.name]: value })
    }



    const upload = (items) => {
        items.forEach(item => {
            if (item.file) {
                const fileName = new Date().getTime() + item.label + item.file.name
                const uploadTask = storage.ref(`/items/${fileName}`).put(item.file)
                uploadTask.on("state_changed", snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(progress + "%");
                    setProgress(progress)
                },
                    (err) => console.log(err)
                    ,
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then(url => {
                            setUpdateMovie(prev => { return { ...prev, [item.label]: url } })
                        })
                    })
            }


        })
    }


    const handleUpdateFile = (e) => {
        e.preventDefault()
        upload([
            { file: imgThumb, label: "imgThumb" },
            { file: imgTitle, label: "imgTitle" },
            { file: trailer, label: "trailer" },
            { file: video, label: "video" }
        ])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTheMovie(updateMovie, movie._id, dispatch)
    }


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Update Movie</h1>

            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.imgThumb} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Year</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <div className="text-input-form">

                            <label>Movie Title</label>
                            <input type="text" placeholder={movie.title} name="title" onChange={handleChange} />
                            <label>Description</label>
                            <input type="text" placeholder={movie.desc} name="desc" onChange={handleChange} />
                            <label>Year</label>
                            <input type="text" placeholder={movie.year} name="year" onChange={handleChange} />
                            <label>limit</label>
                            <input type="text" placeholder={movie.limit} name="limit" onChange={handleChange} />
                            <label>Genre</label>
                            <input type="text" placeholder={movie.genre} name="genre" onChange={handleChange} />
                            <div className="addProductItem">
                                <label>Is Series?</label>
                                <select name="isSeries" id="isSeries" onChange={handleChange}>
                                    <option >select</option>
                                    <option value="false">No</option>
                                    <option value="true">yes</option>
                                </select>
                            </div>
                        </div>
                        <div className="file-input-form">

                            <label>Title Imgage</label>
                            <input type="file" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])} />
                            <label>Thumb Imgage</label>
                            <input type="file" name="imgThumb" onChange={(e) => setImgThumb(e.target.files[0])} />
                            <label>Trailer</label>
                            <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])} />
                            <label>Video</label>
                            <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])} />
                        </div>


                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={movie.imgThumb} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton" onClick={handleUpdateFile}>Handle File</button>
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}