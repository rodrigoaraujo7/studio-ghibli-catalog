import { useMemo, useState } from "react"

import { SearchInput } from "./SearchInput"
import { FilmCard } from "./FilmCard"

import { useFilmContext } from "../context/FilmContext"
import { Button } from "./Button"

export const Catalog = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("")

  const { films } = useFilmContext()

  const filteredFilms = useMemo(() => {
    return films.filter((film) =>
      film.title.toLowerCase().includes(searchInputValue.toLowerCase())
    )
  }, [films, searchInputValue])

  const clearFilter = () => {
    setSearchInputValue("")
  }

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search movies..."
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />

      {filteredFilms.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 py-10">
          <p className="text-lg text-gray-500">No movies found matching "{searchInputValue}"</p>
          <Button
            variant="outlined"
            style={{ width: "fit-content" }}
            onClick={clearFilter}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFilms.map(film => (
            <FilmCard
              film={film}
            />
          ))}
        </div>
      )}
    </div>
  )
}