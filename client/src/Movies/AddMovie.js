import React, { useState } from 'react';
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: ['']
}

export default function AddMovie(props) {
    const [movie, setMovie] = useState(initialState)

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

    const addActors = e => {
        e.preventDefault()
        setMovie({...movie,
            stars: [...movie.stars, '']
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            setMovie(initialState)
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='updateContainer'>
            <h1>Add a Movie</h1>
            <form className='update-form' onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Title'></input>
                <input type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Director'></input>
                <input type='text' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Metascore'></input>
                {movie.stars.map((star, idx) => <input key={idx} type='text' name='stars' value={star} onChange={(e) => starsChangeHandler(idx, e)} placeholder='Actors'></input>)}
                <button className='updateButton' onClick={addActors}>Add Actors</button>
                <button className='updateButton' onClick={handleSubmit}>Add Movie</button>
            </form>
        </div>
    )
} 