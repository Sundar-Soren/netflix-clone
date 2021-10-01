import React, { useContext, useState } from "react";
import "./addMovie.scss";
import storage from "../../../firebase";
import { addMovie } from "../../../context/movieContext/apiCallMovie";
import { MovieContext } from "../../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";
const AddMovie = () => {
  const { dispatch } = useContext(MovieContext);

  const [movie, setMovie] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumb, setImgThumb] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress + "%");
          setProgress(progress);
        },
        (err) => console.log(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: imgThumb, label: "imgThumb" },
      { file: imgTitle, label: "imgTitle" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie, dispatch);
    history.push("/allmovieslist");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add New Movie</h1>
      <form className="addProductForm">
        <div className="text-input-from">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="John wick"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input
              type="text"
              placeholder="age limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option>select</option>
              <option value="false">No</option>
              <option value="true">yes</option>
            </select>
          </div>
        </div>
        <div className="file-input-from">
          <div className="progress-bar-container">
            {uploaded === 4 ? (
              <>
                <p>All File Uploaded successfully</p>
              </>
            ) : (
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>

          <div className="addProductItem">
            <label>title image</label>
            <input
              type="file"
              id="imgtitle"
              name="imgtitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Thumbnail Image </label>
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgThumb(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Trailer</label>
            <input
              type="file"
              id="trailer"
              name="tariler"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Video</label>
            <input
              type="file"
              id="video"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          {uploaded === 4 ? (
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          ) : (
            <button className="addProductButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
