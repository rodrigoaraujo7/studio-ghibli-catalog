import { useFilmContext } from "./context/FilmContext"

function App() {
  const { films, loading } = useFilmContext()

  return (
    <div>
      <h1>Filmes</h1>

      {loading ? <h1>Carregando ....</h1> : <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>}
    </div>
  )
}

export default App
