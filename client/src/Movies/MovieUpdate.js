import React, { useEffect, useState } from 'react';
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function MovieUpdate (props) {
    const [movie, setMovie] = useState(initialState)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const starsChangeHandler = (idx, e) => {
      const updatedStars = [...movie.stars]
      updatedStars[idx] = e.target.value
      setMovie({
      ...movie,
      stars: updatedStars
      })
  }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            setMovie(initialState)
            props.history.push(`/movies/${props.match.params.id}`)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='updateContainer'>
            <h1>Update Movie</h1>
            <form className='update-form' onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder={movie.title}></input>
                <input type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Director'></input>
                <input type='number' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Metascore'></input>
                {movie.stars.map((star, idx) => <input key={star[idx]} type='text' name='stars' value={star} onChange={(e) => starsChangeHandler(idx, e)} placeholder='Actors'></input>)}
                <button className='updateButton'>Update Movie</button>
            </form>
        </div>
    )
}