import { SearchInput } from "./SearchInput"
import { FilmCard } from "./FilmCard"

import { useFilmContext } from "../context/FilmContext"

export const Catalog = () => {
  const { films } = useFilmContext()

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search movies..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {films.map(film => (
          <FilmCard
            film={film}
          />
        ))}
      </div>
    </div>
  )
}