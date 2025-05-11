import axios from "axios"
import { useState } from "react"
import type { Film } from "./types/Film"

function App() {
  const [films, setFilms] = useState<Film[]>([])

  axios.get("https://ghibliapi.vercel.app/films/")
    .then(res => {
      setFilms(res.data)
    })
    .catch(err => {
      console.log(err)
    })

  return (
    <div>
      <h1>Filmes</h1>

      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
